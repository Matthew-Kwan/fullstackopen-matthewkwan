import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: ""
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [msgState, setMsgState] = useState('')

  // GET Request for existing blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  // Components

  const Notification = ({ message, msgState }) => {
    if (errorMessage === null) {
      return null
    }

    const notificationStyle = {
      color: (msgState === 'success' ? 'green' : 'red'),
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  const logoutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label>
        Title
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </label> <br></br>
      <label>
        Author
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </label> <br></br>
      <label>
        URL
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </label>

      <button type="submit">save</button>
    </form>
  )

  // Event Handlers

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = newBlog

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({
          title: "",
          author: "",
          url: ""
        })
        // success message
        setMsgState('success')
        setErrorMessage(
          `Blog with title '${blogObject.title}' by '${blogObject.author}' created`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleBlogChange = (event) => {
    const value = event.target.value
    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      //define notification msg
      setMsgState('success')
      setErrorMessage(
        `Welcome ${user.name}, you have successfully logged in!`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setMsgState('error')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // Returned HTML

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={errorMessage} msgState={msgState}/>
      { user === null ?
        <div>
        {loginForm()}
        </div> :
        <div>
          <p>{user.name} logged in {logoutButton()}</p>
          {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App