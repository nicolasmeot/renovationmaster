const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const projectSchema = new Schema({
    clientFirstName: String,
    clientLastName: String,
    clientAddress : String,
    clientPhoneNumber : Number,
    clientEmail : String,
    firstMeetingDate : Date,
    firstMeetingAddress : String,
    projectDescription : String,
    projectDeadline : Date,
    projectMap : String,
    Rooms : [{type: Schema.Types.ObjectId, ref: "Room"}],

});

const Project = model("Project", projectSchema);

module.exports = Project;