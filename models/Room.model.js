const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
    roomName: String,
    roomDescription: String,
    finishDate: Date,
    roomInitialPictures: [Image], /*Je sais pas trop sous quel format on doit rentrer l'image*/
    threeDRendering: [Image],
    currentPictures: [{img: Image, date: Date}],  
    Tasks : [{type: Schema.Types.ObjectId, ref: "Task"}],
});

const Room = model("Room", roomSchema);

module.exports = Room;