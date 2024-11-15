import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

