import React, { useState } from 'react';
import Blog from '../components/Blog';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, popupMessage, setPopupMessage }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    });

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
        }

        blogService.create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewBlog({ title: '', author: '', url: '' })
                setPopupMessage({
                    text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
                    class: 'success'
                })
                console.log(popupMessage)
                setTimeout(() => {
                    setPopupMessage({
                        text: null,
                        class: ''
                    })
                }, 5000)
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
                type="text"
                name="url"
                value={newBlog.url}
                onChange={handleBlogChange}
                placeholder="url"
            />
            <button type="submit">create</button>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </form>
    )
}

export default BlogForm;
