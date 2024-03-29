import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'staff'],
      message: 'This {VALUE} option is not supported'
    },
    required: true
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
}, { 
  timestamps: true 
})

const User = mongoose.model('User', userSchema)

export default User
