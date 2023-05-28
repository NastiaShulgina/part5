import Togglable from "./Togglable"
import blogService from '../services/blogs'
import { useState } from "react"

const Blog = ({ blog, registeredUser, setPopupMessage }) => {
  const [likesAmount, setLikesAmount] = useState(blog.likes)

  const blogUserIsRegistered = () => {
    return blog.user?.username === registeredUser
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const spanStyle = {
    margin: 10
  }

  const handleLike = async (blogId) => {
    try {
      const res = await blogService.addLike(blogId)
      setLikesAmount(res.likes)
    } catch (exception) {
      setPopupMessage({
        text: 'error updating blog post',
        class: 'error'
      })
      setTimeout(() => {
        setPopupMessage({
          text: null,
          class: ''
        })
      }, 5000)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setPopupMessage({
          text: 'Blog post deleted successfully',
          class: 'success'
        })
        setTimeout(() => {
          setPopupMessage({
            text: null,
            class: ''
          })
        }, 5000)
      } catch (exception) {
        setPopupMessage({
          text: 'Error deleting blog post',
          class: 'error'
        })
        setTimeout(() => {
          setPopupMessage({
            text: null,
            class: ''
          })
        }, 5000)
      }
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view">
        <div>
          <span>url: </span>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          <span>likes: </span>
          <span style={spanStyle}>{likesAmount}</span>
          <span>
            <button onClick={() => handleLike(blog.id)}>like</button>
          </span>
        </div>
        <div>
          <span>author: </span>
          {blog.user !== undefined ? <span>{blog.user.username}</span> : <span>created by system</span>}
          {blogUserIsRegistered() && <button type="delete" onClick={() => handleDelete(blog.id)}>delete</button>}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog