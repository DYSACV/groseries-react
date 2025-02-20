const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employe_number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  aye: { type: Number, required: true },
  email: { type: String, required: true },
  salary: { type: Number, required: true }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
