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
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes

  })

  const savedBlog = await blog.save()
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