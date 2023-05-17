const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullName: String,
  companyRegistrationNb: Number,
  companyAddress: String,
  companyPostCode: Number,
  phoneNb:String,
  email: {type: String,
  unique: true, required:true},
  password: {type: String, required: true},
  projects: [{type: Schema.Types.ObjectId, ref: "Project"}]

});

const User = model("User", userSchema);

module.exports = User;
