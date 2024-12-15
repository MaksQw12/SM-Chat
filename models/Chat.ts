import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
  {
    usersId: {
      type: [String],
      required: true,
      unique: true,
    },
    messages: [
      {
        senderId: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
