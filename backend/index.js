import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { collectionName, connection } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
const app = express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5174',
    credentials:true
}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send({
        message: "this is running",
        success: true
    })
})


app.post("/signup", async (req, res) => {
    const userData = req.body;
    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('users')
        const result = await collection.insertOne(userData)
        if (result) {
            jwt.sign(userData, 'googleruchi', { expiresIn: '5d' }, (error, token) => {
                res.send({
                    success: true,
                    message: 'signup done',
                    token
                })

            })
        } else {
            res.send({
                success: false,
                message: "sign up not done"
            })
        }

    }

    console.log(userData)

})


app.post("/login", async (req, res) => {
    const userData = req.body;
    if (userData.email && userData.password) {
        const db = await connection();
        const collection = await db.collection('users')
        const result = await collection.findOne({email:userData.email,password:userData.password})
        if (result) {
            jwt.sign(userData, 'googleruchi', { expiresIn: '5d' }, (error, token) => {
                res.cookie('token',token,{
                    httpOnly:true,
                    maxAge:5*24*60*60*1000
                })
                res.send({
                    success: true,
                    message: 'login done',
                    token
                })

            })
        } else {
            res.send({
                success: false,
                message: "user not found"
            })
        }

    } else{
        res.send({
            success:false,
            message:"login not done"
        })
    }


    console.log(userData)

})


app.post("/add-task", async (req, res) => {
    const db = await connection()
    const collection = await db.collection(collectionName)
    const result = await collection.insertOne(req.body)
    if (result) {
        res.send({ message: 'new task added', success: true, result })
    } else {
        res.send({
            message: "task not added",
            success: false
        })
    }
})
app.get("/tasks",verifyJwtToken, async (req, res) => {
    const db = await connection()
    console.log("cookie test",req.cookies['token'])
    const collection = await db.collection(collectionName)
    const result = await collection.find().toArray()
    if (result) {
        res.send({ message: 'task list fetch', success: true, result })
    } else {
        res.send({
            message: "erro try after sometime",
            success: false
        })
    }
})

function verifyJwtToken(req, res, next) {
    console.log("verify jwt token", req.cookies?.['token']);
    const token = req.cookies?.['token'];
     if (!token) {
        return res.status(401).json({
            message: 'Token missing or invalid',
            success: false
        });
    }
    jwt.verify(token, 'googleruchi', (error, decoded) => {
        if (error) {
            return res.status(403).json({
                message: 'invalid token',
                success: false
            });
        }
           console.log(decoded);
        req.user = decoded; // decoded data store kar sakte ho
        next(); // sirf yaha next() call karein
    });
}

app.put("/update-task", async (req, res) => {
    const db = await connection()
    const collection = await db.collection(collectionName)
    const { _id, ...fields } = req.body;
    const update = { $set: fields }
    console.log(fields)
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, update)
    if (result) {
        res.send({ message: 'task list data update', success: true, result })
    } else {
        res.send({
            message: "error try after sometime",
            success: false
        })
    }
})

app.get("/task/:id", async (req, res) => {
    const db = await connection()
    const id = req.params.id
    const collection = await db.collection(collectionName)
    const result = await collection.findOne({ _id: new ObjectId(id) })
    if (result) {
        res.send({ message: 'task list fetch', success: true, result })
    } else {
        res.send({
            message: "erro try after sometime",
            success: false
        })
    }
})
app.delete("/delete/:id", async (req, res) => {
    const db = await connection()
    const id = req.params.id
    const collection = await db.collection(collectionName)
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    if (result) {
        res.send({ message: 'task list deleted', success: true, result })
    } else {
        res.send({
            message: "error try after sometime",
            success: false
        })
    }
})

app.delete("/delete-multiple", async (req, res) => {
    const db = await connection()
    const Ids = req.body;
    const delteTaskIds = Ids.map((item) => new ObjectId(item))
    console.log(Ids)
    const collection = await db.collection(collectionName)
    const result = await collection.deleteMany({ _id: { $in: delteTaskIds } })
    if (result) {
        res.send({ message: 'task list deleted', success: result })
    } else {
        res.send({
            message: "error try after sometime",
            success: false
        })
    }
})

const port = 4000;
app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`)
})