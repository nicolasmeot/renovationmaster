const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
    projectId:String,
    roomName: String,
    roomDescription: String,
    finishDate: Date,
    roomInitialPictures: [String], /*Je sais pas trop sous quel format on doit rentrer l'image*/
    threeDRendering: [String],
    currentPictures: [{img: String, date: Date}],  
    Tasks : [{type: Schema.Types.ObjectId, ref: "Task"}],
});

const Room = model("Room", roomSchema);

module.exports = Room;