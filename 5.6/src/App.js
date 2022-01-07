import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Alart from './components/Alart';
import blogService from './services/blogs'
import AuthService from './services/auth'

const App = () => {
  const [blogs, setBlogs] = useState([])
  var [login, setLogin] = useState(false);
  var [createblog, setCreateBlog] = useState(false);
  var [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));
  var [alart, setAlart] = useState({
    color: 'green',
    visibility: false,
    msg: ''
  });

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
		setBlogformData(blogformdata);
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
      showAlert('red', error);
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
        showAlert('green', 'New blog added successfully');
      })
      .catch((err) => {
        showAlert('red', err.response.data.message);
      })
    }
  }

  const logOut = e => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedInUser');
    login = false;
    setLogin(login);
  };

  const togoleCreateBlog = e => {
    if(createblog){
      createblog = false;
    }else{
      createblog = true;
    }
    setCreateBlog(createblog);
  };

  const showAlert = (color, msg) =>{
    alart = {
      color: color,
      visibility: true,
      msg: msg,
    }
    setAlart(alart);
    window.setTimeout(()=>{
      alart = {
        color: color,
        visibility: false,
        msg: msg,
      }
      setAlart(alart);
    },2000)
  }

  return (
    <div>
      {login ? (
      <div>
        <h2>blogs</h2>

        <Alart alart={alart}/>

        <p>{user.name} logged in  <button type="button" onClick={logOut}>Log out</button></p>
        
        {createblog ? (
          <BlogForm submitBlogForm={submitBlogForm} handleBlogInputChange={handleBlogInputChange} togoleCreateBlog={togoleCreateBlog} />
        ) : (
          <button type="button" onClick={togoleCreateBlog}>Create new blog</button>
        )}

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