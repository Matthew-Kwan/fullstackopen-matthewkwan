const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

// HTTP GET ALL REQUEST 
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// HTTP POST REQUEST 
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.content,
    author: body.author,
    url: body.url,
    likes: body.likes

  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter