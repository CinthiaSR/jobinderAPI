import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

  content: {
    type: String
  },
  posts: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  }
}, { 
  timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
