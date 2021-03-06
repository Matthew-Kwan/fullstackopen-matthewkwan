const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')

// HTTP GET ALL REQUEST
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

// HTTP POST REQUEST
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
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
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(202).end()

})

// HTTP DELETE REQUEST
blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  console.log('Token: ', token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  const blog = await Blog.findById(request.params.id)

  console.log('Blog: ', blog.title)

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'accessing another user\'s blog' })
  } else {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(200).end()
  }


})

module.exports = blogsRouter