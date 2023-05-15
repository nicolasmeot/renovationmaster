const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
    taskName: String,
    taskDetails: [{
        procedure: String,
        position: String,
        remarks: String,
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
    finishDate:Date,

});

const Room = model("Room", roomSchema);

module.exports = Room;