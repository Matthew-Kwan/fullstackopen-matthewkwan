import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [msgState, setMsgState] = useState('')

  const blogFormRef = useRef()


  // GET Request for existing blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => {
        return b.likes - a.likes
      } ))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const loggedUserIdJSON = window.localStorage.getItem('loggedBlogappUserId')
      const userId = JSON.parse(loggedUserIdJSON)
      setUser(user)
      setUserId(userId)
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

  // Event Handlers

  const addBlog = (newBlog) => {
    const blogObject = newBlog
    blogObject.user = userId

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        // toggle blog form visibility
        blogFormRef.current.toggleVisibility()
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

  const updateLikes = (blog) => {
    blogService.update(blog, blog.id)
    .then(response => {
      setBlogs(blogs.map(b => (b.id === response.id ? response : b)))
    })
  }

  const deleteBlog = (blog) => {

    if (window.confirm("Do you really want to delete this blog from the list?")) {
      blogService.deleteBlog(blog.id)
      .then(response => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs.sort((a,b) => {
            return b.likes - a.likes
          } ))
        )
        .catch(err => {
          console.log(`Delete failed: ${err}`)
        })
      })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      let userData = await userService.getAll()
      userData = userData.filter(usr => usr.username === username)
      setUserId(userData.id)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      window.localStorage.setItem(
        'loggedBlogappUserId', JSON.stringify(userId)
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
      console.log(exception)
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
    window.localStorage.removeItem('loggedBlogappUserId')
    setUser(null)
    setUserId('')
  }

  // Returned HTML

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={errorMessage} msgState={msgState}/>
      { user === null ?
        <Togglable buttonLabel='Log In'>
           <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{user.name} logged in {logoutButton()}</p>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
        </div>
      }

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App