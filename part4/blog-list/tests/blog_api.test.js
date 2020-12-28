const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/bloglist')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog)) 
  const promiseArray = blogObjects.map(blog => blog.save()) 
  await Promise.all(promiseArray)
})

// Checks that the get-all returns the appropriate number of blogs in JSON
test('api - blogs are returned as json', async () => {
  const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('api - check for property named \'id\'', async () => {
  const response = await api.get('/api/blogs')
  let body = response.body
  expect(body[0].id).toBeDefined()
})

test('api - check that post increments length correctly', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Matthew Kwan',
    url: 'test.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1) 

  // check for content 

  const blogTitles = blogsAtEnd.map(blog => blog.title)
  expect(blogTitles).toContain('New Blog')
})

afterAll(() => {
  mongoose.connection.close()
})