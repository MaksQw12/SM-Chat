import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: '/some-image.png',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
