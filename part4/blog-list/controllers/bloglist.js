const blogsRouter = require('express').Router()
const Blog = require('../models/bloglist')

// HTTP GET ALL REQUEST 
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

// HTTP POST REQUEST 
blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.content,
    author: body.author,
    url: body.url,
    likes: body.likes

  })

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter