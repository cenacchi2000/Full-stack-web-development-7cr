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
          <p>{props.blog.likes} <button>like</button></p>
          <p>{props.blog.author}</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>  
  )
}

export default Blog;