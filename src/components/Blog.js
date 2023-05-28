import Togglable from "./Togglable"
import blogService from '../services/blogs'
import { useState } from "react"

const Blog = ({ blog, user, setPopupMessage }) => {
  const [likesAmount, setLikesAmount] = useState(blog.likes)

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
          <span>user: </span>
          <span>{user}</span>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog