const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullName: {
    type: String,
    unique: true
  },
  companyRegistratioNb: Number,
  companyAddress: String,
  companyPostCode: Number,
  phoneNb:Number,
  email: String,
  password: String,
  projects: [{type: Schema.Types.ObjectId, ref: "Project"}]

});

const User = model("User", userSchema);

module.exports = User;
