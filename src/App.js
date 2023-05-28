import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [popupMessage, setPopupMessage] = useState({
    text: null,
    class: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.clear()
  }

  const blogsList = () => (
    <div>
      <h1>blogs</h1>
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <br />
      {showBlogForm ?
        <BlogForm newBlog={newBlog} setNewBlog={setNewBlog} blogs={blogs} setBlogs={setBlogs}
          setPopupMessage={setPopupMessage} setShowBlogForm={setShowBlogForm} />
        : <button onClick={() => setShowBlogForm(true)}>new note</button>}
      {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user.username} setPopupMessage={setPopupMessage} />)}
    </div>
  )

  return (
    <div>
      {popupMessage.text !== null && <h3 className={`${popupMessage.class}`}>{popupMessage.text}</h3>}

      {user === null && <LoginForm username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} setUser={setUser} setPopupMessage={setPopupMessage} />}
      {user !== null && blogsList()}
    </div>
  )
}

export default App