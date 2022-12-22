const {Router, json} = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();

const secret_key = process.env.JWT_KEY;

const userRouter = Router();
const userModel = require("./user.schema");

userRouter.get("/",async(req,res)=>{
    let allUser = await userModel.find({})

    res.status(200).send({message:"Incoming ON",data:allUser});
})

userRouter.post("/", async(req,res)=>{
    let {username,password} = req.body;

    let findOne = await userModel.findOne({username:username});
    if(!findOne){
        let newUser = await userModel.create({username,password});

        res.status(200).send({username: newUser.username,message:"Account Created Successfully"})
        return;
    }
    res.status(400).send({message:"User Already Exists"})
})

userRouter.post("/login", async(req,res)=>{
    let {username,password} = req.body;

    let findOne = await userModel.findOne({username:username,password:password});
    if(!findOne){
    
        res.status(400).send({message:"Something went wrong!!!"})
        return;
    }

    let token = jwt.sign({_id:findOne._id,username:findOne.username},secret_key,{expiresIn:"1 hours"})
    res.status(200).send({message:"Login Successful",token:token,username:findOne.username});
})
userRouter.post("/verify",async(req,res)=>{
    let {token} = req.body;
    //let out = await jwt.decode(token);
    jwt.verify(token,secret_key,(err,dec)=>{
        if(err){
            //console.log("error")
            res.status(401).send({token:err});
        }else{
            //console.log("decode")
            res.status(200).send({token:token});
        }
    })
    
})

module.exports = userRouter;
