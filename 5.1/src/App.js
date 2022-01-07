import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import AuthService from './services/auth'

const App = () => {
  const [blogs, setBlogs] = useState([])
  var [login, setLogin] = useState(false);
  var [user, setUser] = useState({
    name: '',
    username: '',
  });

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  var [error, setError] = useState([])
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

  const submitLoginForm = (e) =>{
    e.preventDefault();

    if(formdata.username && formdata.password){
      AuthService.login(formdata)
      .then((res) => {
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


  return (
    <div>
      {login ? (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
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