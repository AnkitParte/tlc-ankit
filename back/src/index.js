const express = require('express')
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config();

const app = express()
const PORT = process.env.PORT || 8888;
const MONGO_URL = process.env.MONGO_URL || "";
const dbConnect = require("../config/config");
const userRouter = require("../features/user/user.router");
const eventRouter = require("../features/event/event.router");

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());
app.use("/user",userRouter);
app.use("/event",eventRouter);

app.get('/', (req, res) => res.send("halo bro it\'\s me"))

app.listen(PORT, async() => {
    await dbConnect(MONGO_URL);
    console.log(`server is dancing on ${PORT}`)
})