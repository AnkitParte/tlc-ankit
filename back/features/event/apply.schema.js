const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
    eventId:{
        type: mongoose.Schema.Types.ObjectId, ref:"event", required:true
    },
    applicant:{
        userId:{ type: mongoose.Schema.Types.ObjectId, ref:"user", required:true},
        username:{type:String},
    },
    status:{type:Boolean,default:false},
    reject:{type:Boolean,default:false},
})

const appModel = mongoose.model("application",appSchema);
module.exports = appModel;