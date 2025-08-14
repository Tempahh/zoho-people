import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  recordId: { type: String, required: true, unique: true },
  photoUrl: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  employeeId: { type: String },
  department: { type: String },
  zohoRole: { type: String },
  employeeStatus: { type: String },
  addedTime: { type: String },
});

export default mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
