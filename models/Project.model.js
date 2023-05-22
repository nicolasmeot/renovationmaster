const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const projectSchema = new Schema({
    userId: String,
    FirstName: String,
    LastName: String,
    Address : String,
    PhoneNb : Number,
    Email : String,
    firstMeetingDate : Date,
    firstMeetingAddress : String,
    projectDescription : String,
    projectDeadline : Date,
    projectMap : String,
    Rooms : [{type: Schema.Types.ObjectId, ref: "Room"}],

});

const Project = model("Project", projectSchema);

module.exports = Project;