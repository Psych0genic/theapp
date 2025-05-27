import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'New Thread' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Thread', threadSchema);