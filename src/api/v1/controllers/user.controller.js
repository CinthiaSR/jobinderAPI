// import UserService from '../../'
import User from '../models/user.model'

export class UserController {
  getAllUsers=async(request, response, next)=>{
    try {
      const users = await User.find({}).populate('post')  
      response.status(200).send(users)
    } catch(error) {
      next(error)
    }  
  }

  getUser=async(request, response,next)=> {
    try {
      const { id } = request.params // se obtiene de la url de la peticion
      const user = await User.findById(id).populate('posts')
      if (!user) {
        response.status(404).send({ 
          error: 'No se encontro ningún registro en la base de datos'
        })
      }  
      response.status(200).send(user)
      response.json({ message: 'Get User OK' })
    } catch(error) {
      next(error)
    }
  }

  createUser= async(request, response, next)=> {
    try {
      // obtenemos los datos de la solicitud
      const { name, email, password, role, posts } = request.body
      console.log(request.body)
      // preparamos los datos que vienen del cliente en nuestro modelo
      const newUser = new User({
        name,
        email,
        password,
        role,
        posts
      })
      // salvamos en nuestra base de datos
      await newUser.save()
      // enviamos la respuesta al cliente
      response.status(201).send(newUser)
      response.json({ message: 'Create User OK' })
    } catch(error) {
      next(error)
    }
  }

  updateUser= async(request, response, next)=>{
    try {
      const { id } = request.params
      const bodyParams = { ...request.body }  
      const updatedUser = await User.findByIdAndUpdate(id, bodyParams, { new: true })
      response.status(201).send(updatedUser)
      response.json({ message: 'Update User OK' })
    } catch(error) {
      next(error)
    }
  }

  deleteUser= async(request, response, next)=>{
    try {
      const { id } = request.params
      const deletedUser = await User.findByIdAndDelete(id)
      
      if (!deletedUser) {
        response.status(404).send({ 
          error: 'No se encontro ningún registro en la base de datos'
        })
      }      
      response.status(204).send({ message: 'Registro eliminado correctamente'});
      response.json({ message: 'Delete User OK' })
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()