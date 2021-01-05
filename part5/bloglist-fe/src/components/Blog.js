import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} <a href={blog.url}> {blog.url} </a>
  </div>
)

export default Blog
