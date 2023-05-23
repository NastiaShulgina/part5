import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      content: newBlog,
      important: Math.random() > 0.5,
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
      })
  }

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
    console.log(newBlog);
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
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
      <h1>blogs</h1>
      {/* <input
        value={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button> */}
      <p>{user.username} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </form>  
  )

  // console.log(user)
  // console.log(blogs[0])

  return (
    <div>
      {errorMessage !== null && <h3>{errorMessage}</h3>}
      {user === null && loginForm()}
      {user !== null && blogForm()}
      {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
    </div>
  )
}

export default App