const Blog = require('../models/bloglist')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Matthew Kwan',
    url: 'www.github.com/matthew-kwan',
    likes: 50
  },
  {
    title: 'HTML is not easy',
    author: 'Matthew Kwan',
    url: 'www.github.com/matthew-kwan',
    likes: 4
  },
]

const blogsInDB = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}


module.exports = {
  initialBlogs,
  blogsInDB
}