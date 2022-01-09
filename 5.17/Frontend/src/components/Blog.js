import React, { useState } from 'react'
function Blog(props){
  var [show, setShow] = useState(false);

  const togoleDetails = e => {
    if(show){
      show = false;
    }else{
      show = true;
    }
    setShow(show);
  };

  return(
    <div>
      {props.blog.title} {props.blog.author} <button type="button" onClick={togoleDetails}>view</button>
      
      {show ? (
        <div>
          <p>{props.blog.title} <button type="button" onClick={togoleDetails}>hide</button></p>
          <p>{props.blog.url}</p>
          <p>{props.blog.likes} <button type="button" onClick={() => { props.increaseLike(props.blog) }}>like</button></p>
          <p>{props.blog.author}</p>
          <button type="button" style={{backgroundColor: '#8080f8', border:'none', padding:'5px 10px', borderRadius:'10px', marginBottom:'10px'}} onClick={() => { props.deleteBlog(props.blog) }}>Remove</button>
        </div>
      ) : (
        <p></p>
      )}
    </div>  
  )
}

export default Blog;