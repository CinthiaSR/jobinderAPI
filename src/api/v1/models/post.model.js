import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  imageURL: {
    type: String
  },
  // likes:{
  //   type:Number
  // },
  comments: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
    }
  ],
  // tags:{
  //   type: String
  // },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require:true
  }
}, { 
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post
