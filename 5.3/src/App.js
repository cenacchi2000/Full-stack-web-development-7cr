import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import AuthService from './services/auth'

const App = () => {
  const [blogs, setBlogs] = useState([])
  var [login, setLogin] = useState(false);
  var [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));

  useEffect(() => {
    if(user){
      login = true;
      setLogin(login);
    }

    blogService.getBlogs()
    .then((res) => {
      let blogs = res.data.blogs;
      setBlogs(blogs);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  var [error, setError] = useState([])
  var [blogformdata, setBlogformData] = useState({
    "title": '',
    "author": '',
    "url": '',
  });
  
  var [formdata, setFormData] = useState({
    "username": '',
    "password": ''
  });

  const handleInputChange = e => {
		const { name, value } = e.target;
    switch(name){
      case "username":
        formdata.username = value;
        break;
      case "password":
        formdata.password = value;
        break;
      default:
        console.log("invalid");
    }
    setFormData(formdata) ;
	};

  const handleBlogInputChange = e => {
		const { name, value } = e.target;
    switch(name){
      case "title":
        blogformdata.title = value;
        break;
      case "author":
        blogformdata.author = value;
        break;
      case "url":
      blogformdata.url = value;
      break;
      default:
        console.log("invalid");
    }
    setBlogformData(blogformdata) ;
	};

  const submitLoginForm = (e) =>{
    e.preventDefault();

    if(formdata.username && formdata.password){
      AuthService.login(formdata)
      .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('loggedInUser',JSON.stringify(res.data.user));
        user = res.data.user;
        setUser(user);
        login = true;
        setLogin(login);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    error = '';

    if(!formdata.username){
      error = "Username can not be blank";
    }
    
    if(!formdata.password){
      error = "Password can not be blank";
    }
    
    setError(error);
  }

  const submitBlogForm = (e) =>{
    e.preventDefault();

    if(blogformdata.title && blogformdata.author && blogformdata.url){
      blogService.saveBlog(blogformdata)
      .then((res) => {
        let blog = res.data.blogs;
        blogs.push(blog);
        setBlogs(blogs);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  const logOut = e => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedInUser');
    login = false;
    setLogin(login);
  };

  return (
    <div>
      {login ? (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in  <button type="button" onClick={logOut}>Log out</button></p>
        
        <BlogForm submitBlogForm={submitBlogForm} handleBlogInputChange={handleBlogInputChange} />

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      ) : (
        <Login submitLoginForm={submitLoginForm} handleInputChange={handleInputChange} error={error} />
      )}
    </div>
  )
}

export default App