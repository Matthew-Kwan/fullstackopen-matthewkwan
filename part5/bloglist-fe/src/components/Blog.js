import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} <a href='https://github.com/matthew-kwan'> {blog.url} </a>
  </div>
)

export default Blog
