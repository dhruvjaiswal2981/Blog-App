import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'; // Import Header
import Footer from './Footer'; // Import Footer
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const createPost = async () => {
    if (!title || !content) return;
    try {
      await axios.post('http://localhost:5000/posts', { title, content });
      fetchPosts();
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  const startEditPost = (post) => {
    setEditId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const updatePost = async () => {
    if (!editTitle || !editContent) return;
    try {
      await axios.put(`http://localhost:5000/posts/${editId}`, {
        title: editTitle,
        content: editContent,
      });
      fetchPosts();
      setEditId(null);
      setEditTitle('');
      setEditContent('');
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header /> {/* Render the Header */}

        <Routes>
          <Route path="/" element={
            <div className="posts-list">
              <h2>Blogs</h2>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="post-item">
                    {editId === post.id ? (
                      <div className="edit-post">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                        <button onClick={updatePost}>Update</button>
                        <button onClick={() => setEditId(null)}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <h3><strong>Title :- </strong>{post.title}</h3>
                        <p><strong>Blog Content :- </strong>{post.content}</p>
                        <button onClick={() => startEditPost(post)}>Edit</button>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          } />

          <Route path="/create" element={
            <div className="create-post">
              <h2>Create Blog</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Blog Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button onClick={createPost}>Create Blog</button>
            </div>
          } />
        </Routes>

        <Footer /> {/* Render the Footer */}
      </div>
    </Router>
  );
}

export default App;
