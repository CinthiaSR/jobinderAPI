
// import PostService from '../../'
import Post from '../models/post.model'
import CommentService from '../models/comment.model'
import User from '../models/user.model'
export class PostController {
  
  getAllPosts = async (request, response, next) => {
    try {
      const lastPosts = await Post.find({}).populate(User).populate(CommentService)
      response.status(200).send(lastPosts)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  createPost = async (request, response, next) => {
    try {
      // create and save new post
      const { title, content, likes, tags, author } = request.body
      const newPost = new Post({
        title,
        content,
        likes,
        tags,
        author  
      })
      await newPost.save()
      const user = await User.findById({ _id: newPost.author })
      user.posts.push(newPost)
      
      await user.save({ validateBeforeSave: false })  
      response.status(201).send(newPost)

    } catch (error) {
      console.error(error)
      next(error)
    }
  }
  getPost = async (request, response, next) => {
    try {
      const { id } = request.params
      const post = await Post.findById(id).populate('author', "comments")

      if (!post) {
        return response.status(404).send({ message: 'Post not found' })
      }

      response.status(200).send(post)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  updatePost = async (request, response, next) => {
    try {
      const { id } = request.params
      const bodyParams = { ...request.body }
      const post = await Post.findByIdAndUpdate(id, bodyParams, 
        { new: true })

      if (!post) {
        return response.status(404).send({ message: 'Post not found' })
      }

      response.status(201).send(post)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  deletePost = async (request, response, next) => {
    try {
      const { id } = request.params
      const post = await Post.findByIdAndDelete(id)

      if (!post) {
        return response.status(404).send({ message: 'Post not found' })
      }

      response.status(200).send({ message: 'Post deleted' })
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}



export default new PostController()