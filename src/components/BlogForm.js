import React, { useState } from 'react';
import Blog from '../components/Blog';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, popupMessage, setPopupMessage, setShowBlogForm }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
        likes: null
    })

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
            likes: newBlog.likes
        }

        blogService.create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewBlog({ title: '', author: '', url: '', likes: 0 })
                setPopupMessage({
                    text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
                    class: 'success'
                })
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
        <div>
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
                    type="url"
                    name="url"
                    value={newBlog.url}
                    onChange={handleBlogChange}
                    placeholder="url"
                />
                <input
                    type="number"
                    name="likes"
                    value={newBlog.likes}
                    onChange={handleBlogChange}
                    placeholder="likes"
                />
                <button type="submit">create</button>
                <button onClick={() => setShowBlogForm(false)}>cancel</button>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </form>
        </div>
    )
}

export default BlogForm;
