import React, { useState } from 'react';
import Blog from '../components/Blog';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    likes: 0
  });

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      likes: newBlog.likes
    }

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ title: '', author: '', likes: 0 })
      })
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <form onSubmit={addBlog}>
      <h1>Create new blog</h1>
      <input
        type="text"
        name="title"
        value={newBlog.title}
        onChange={handleBlogChange}
        placeholder="title"
      />
      <input
        type="text"
        name="author"
        value={newBlog.author}
        onChange={handleBlogChange}
        placeholder="author"
      />
      <input
        type="number"
        name="likes"
        value={newBlog.likes}
        onChange={handleBlogChange}
        placeholder="likes"
      />
      <button type="submit">create</button>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </form>
  )
}

export default BlogForm;
