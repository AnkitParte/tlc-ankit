const { Router } = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const eventRouter = Router();
const eventModel = require("./event.schema");
const appModel = require("./apply.schema");
const secret_key = process.env.JWT_KEY;

eventRouter.get("/", async (req, res) => {
    const {filter} = req.query;
    //console.log(filter);
    let allEvent;
    if(!filter || filter=="Others"){
        allEvent = await eventModel.find({}).sort({publishAt:-1}).populate("applications");//([{$sort:{expiryAt:-1}}]);
    }else{
        allEvent = await eventModel.find({category:filter}).sort({publishAt:-1}).populate("applications");//([{$sort:{expiryAt:-1}}]);
    }
    
    res.status(200).send({ data: allEvent });
})
eventRouter.get("/search",async(req,res)=>{
    const data = req.query;
    //console.log(data);{ $regex: 'Commander' }
    let searchEvents = await eventModel.find({ title: { $regex: data.query, $options: "i" }});
    res.status(200).send({data:searchEvents});
})

eventRouter.get("/applications",async(req,res)=>{
    let data = req.headers;
    let myEve = jwt.decode(data.token, secret_key);
    let application = await appModel.find({"applicant.userId":myEve._id}).populate("eventId");
    res.status(200).send({data:application})
})

eventRouter.get("/myevents",async(req,res)=>{
    let data = req.headers;
    //console.log(data);
    let myEve = jwt.decode(data.token, secret_key);

    let currUserEvents = await eventModel.find({"organizer.userId":myEve._id}).populate("applications");
    res.status(200).send({data:currUserEvents})
})

eventRouter.get("/:id", async (req, res) => {
    let {id} = req.params;
    //console.log(req.params);
    let Event = await eventModel.findById({_id:id}).populate("applications");
    res.status(200).send({event : Event });
})



eventRouter.post("/", async (req, res) => {
    let data = req.body;
    let organizer = jwt.decode(data.token, secret_key);

    //console.log(organizer);
    let event = await eventModel.create({
        organizer: {
            userId: organizer._id,
            username: organizer.username,
        },
        title: data.title,
        description: data.description,
        limit: Number(data.limit),
        expiryAt: Number(data.expiryAt),
        publishAt:Number(data.publishAt),
        category:data.category,
        applications: [],
    })
    res.status(200).send({ message: "Event Creation Successful" });
})

eventRouter.patch("/apply", async (req, res) => {
    let data = req.body;
    let applicant = jwt.decode(data.token, secret_key);

    if (!applicant) {
        res.status(400).send({ message: "Something Went Wrong" });
        return;
    }

    let thisEvent = await eventModel.findById({_id:data.eventId}).populate("applications");
    //console.log(thisEvent);
    let array = thisEvent.applications
    for(let i=0;i<array.length;i++){
        let x = array[i]["applicant"]["userId"]
        let char = x.valueOf();
        if(char == applicant._id){
            res.status(502).send({status:400,message:"Already Exist"})
            return;
        }
    }
    

    let newApp = await appModel.create({
        eventId: data.eventId,
        applicant: {
            userId: applicant._id,
            username: applicant.username,
        },
        status: false,
        reject: false,
    })
    if (!newApp) {
        res.status(502).send({ message: "Something Went Wrong" });
        return;
    }
    
    if(thisEvent.limit!=0){
        let newLimit = Number(thisEvent.limit)-1;
        let updateEvent = await eventModel.findByIdAndUpdate({_id:thisEvent._id},
            {$push:{applications:newApp},limit:newLimit}
        )
        res.status(200).send({status:200,message:"Applied"});
        return;
    }

    res.status(502).send({ message: "Something Went Wrong" });
})
eventRouter.patch("/status/:id",async(req,res)=>{
    let {id} = req.params;
    let {status,reject} = req.body;
    //console.log(id,status,reject);
    let upApp = await appModel.findByIdAndUpdate({_id:id},{status:status,reject:reject})
    res.status(200).send({message:"job done"});
})

module.exports = eventRouter;