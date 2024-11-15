import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignedTo: { type: String, required: true },
  deadline: Date,
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
