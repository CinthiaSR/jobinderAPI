import * as express from 'express';
import CommentController from '../controllers/comment.controller'

export default express
  .Router('/posts/comments')
  // .get('/', CommentController.getAllComments)
  .post('/:idPost', CommentController.createComment)
  .get('/:idPost/:id', CommentController.getComment)
  .patch('/:idPost/:id', CommentController.updateComment)
  .delete('/:idPost/:id', CommentController.deleteComment)