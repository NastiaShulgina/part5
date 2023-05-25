import Togglable from "./Togglable"

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    flexWrap: 'wrap',
    width: '40%',
    justifyContent: 'space-between'
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable buttonLabel="view">
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <div>{user}</div>
      </Togglable>
    </div>
  )
}

export default Blog