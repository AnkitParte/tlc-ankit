const {Schema,model} = require("mongoose");
const mongoose = require("mongoose");

const eventSchema = new Schema({
    organizer:{
        userId:{ type: mongoose.Schema.Types.ObjectId, ref:"user", required:true},
        username:{type:String},
    },
    title:{type:String,required:true},
    description:{type:String,required:true},
    limit:{type:Number,required:true},
    expiryAt:{type:Number,required:true},
    publishAt:{type:Number},
    category:{type:String},
    applications:[
        { type:mongoose.Schema.Types.ObjectId, ref:"application"},
    ],

})
const eventModel = model("event",eventSchema);
module.exports = eventModel;