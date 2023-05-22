const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    projectId : String,
    roomId : String,
    taskName: String,
    category : String,
    procedure : String,
    position : String, 
    remarks : String,
    details: [{
        material: String,
        materialCost: Number,
        done: Boolean,
    }],
    workers: [{
        workerName: String,
        workerHourlyPrice: Number,
        hoursSpent : Number
    }],
    startDate : Date,
    startAfter : String,
    finishDate:Date,

});

const Task = model("Task", taskSchema);

module.exports = Task;