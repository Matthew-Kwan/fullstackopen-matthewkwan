import React, { useState } from 'react'
const Blog = ({ blog, updateLikes, deleteBlog }) => {

  // Component states
  const [visible, setVisible] = useState(false)

  // Inline CSS
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Helper Functions

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Event Handlers

  const addLike = (blog) => {
    blog.likes = Number(blog.likes) + 1
    if (blog.user){
      blog.user = blog.user.id
    }
    updateLikes(blog)
  }

  const removeBlog = (blog) => {
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        <div style={showWhenVisible}>
          <a href={blog.url}> {blog.url} </a> <br></br>
          {blog.likes} <button onClick={() => addLike(blog)}>like</button> <br></br>
          <button onClick={() => removeBlog(blog)}>delete</button>
        </div>
      </div>

    </div>
  )
}

export default Blog
