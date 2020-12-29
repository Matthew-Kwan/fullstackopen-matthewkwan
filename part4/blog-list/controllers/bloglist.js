const jwt = require('jsonwebtoken') 

const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')

// Getting Auth Token
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// HTTP GET ALL REQUEST 
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

// HTTP POST REQUEST 
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request) 
  const decodedToken = jwt.verify(token, process.env.SECRET) 
  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id

  })

  const savedBlog = await blog.save()
  user.blogs =  user.blogs.concat(savedBlog._id)
  await user.save() 

  response.status(201).json(savedBlog)
})

// HTTP PUT REQUEST 
blogsRouter.put(':id', async (request, response) => {
  const body = request.body 

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(202).end()

})

// HTTP DELETE REQUEST 
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter