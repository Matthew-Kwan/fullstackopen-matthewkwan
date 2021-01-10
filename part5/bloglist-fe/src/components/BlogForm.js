import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })


  const handleChange = (event) => {
    event.preventDefault()
    const value = event.target.value
    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author:'',
      url: ''
    })
  }

  return (
    <div>
      <h2> Create a New Blog </h2>
      <form onSubmit={addBlog}>
        <label>
            Title
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleChange}
          />
        </label> <br></br>
        <label>
            Author
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleChange}
          />
        </label> <br></br>
        <label>
            URL
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleChange}
          />
        </label>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm