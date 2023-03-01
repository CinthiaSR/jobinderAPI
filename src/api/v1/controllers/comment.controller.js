import User from '../models/user.model'
import Post from '../models/post.model'
import Comment from '../models/comment.model'

export class CommentController {
  getAllComments= async(request, response, next)=> {
    try {
      const comments = await Comment.find({}).populate('author')
  
      // logica de modelos para hacer queries
      response.status(200).send(comments)
      response.json({ message: 'todos lo commentarios' })
    } catch(error) {
      next(error)
    }
  }

  getComment= async(request, response, next)=> {
    try {
      const {idPost}=request.params
      const existPost=await Post.findById(idPost)
      if(!existPost){
        response.status(404).send({
          error:'No se encontro ningun registro en la base de datos'
        })
      }

      const { id } = request.params // se obtiene de la url de la peticion
      const commentNew = await Comment.findById(id).populate('author')
       if (!commentNew) {
         response.status(404).send({ 
           error: 'No se encontro ningún registro en la base de datos'
         })
       }
       response.status(200).send(commentNew)
       response.json({ message: 'Get Comment OK' })
    } catch (error) {
      next(error)
    }
  }

  createComment= async(request, response, next)=> {
    try {
      const {idPost}=request.params
      const existPost=await Post.findById(idPost)
      if(!existPost){
        response.status(404).send({
          error:'No se encontro ningun registro en la base de datos'
        })
      }
      const { content,posts, author } = request.body
      const newComment = new Comment({
        content,
        posts,
        author
      })
      await newComment.save()
      const post = await Post.findById({_id:newComment.posts})
      post.comments.push(newComment)
      await post.save({validateBeforeSave:false})
      response.status(201).send(newComment)
      response.json({ message: 'Create Comment OK' })
    } catch(error) {
      next(error)
    }
  }

  updateComment= async(request, response, next)=> {
    try {
      const {idPost}=request.params
      const existPost=await Post.findById(idPost)
      if(!existPost){
        response.status(404).send({
          error:'No se encontro ningun registro en la base de datos'
        })
      }   
      const { id } = request.params
      const bodyParams = { ...request.body }
  
      const updatedComment= await Comment.findByIdAndUpdate(id, bodyParams, 
          { new: true })  
      response.status(201).send(updatedComment)   
      response.json({ message: 'Update Comment OK' })
    } catch (error) {
      next(error)      
    }
  }

  deleteComment= async(request, response, next)=> {
    try {
      const {idPost}=request.params
      const existPost=await Post.findById(idPost)
      if(!existPost){
        response.status(404).send({
          error:'No se encontro ningun registro en la base de datos'
        })
      }
      const { id } = request.params
      const deletedComment = await Comment.findByIdAndDelete(id)
      if (!deletedComment) {
        response.status(404).send({ 
          error: 'No se encontro ningún registro en la base de datos'
        })
      }
      response.status(200).send(deletedComment);
      response.json({ message: 'Delete Comment OK' })      
    } catch (error) {
      next(error)      
    }
  }
}

export default new CommentController()