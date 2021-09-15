const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Employee = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
  },
  age: {
    type: Number,
    min: 18,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EmployeeSchema = mongoose.model("Employee", Employee);

module.exports = EmployeeSchema;
