import React from 'react'

function BlogForm(props){
    return(
        <div>
            <h3>Create new</h3>
            <form id="blogForm" onSubmit={props.submitBlogForm}>
            <label>Title: </label><input type="text" id="title" name="title" onChange={props.handleBlogInputChange} />
            <br/><br/>
            <label>Author: </label><input type="text" id="author" name="author" onChange={props.handleBlogInputChange}/>
            <br/><br/>
            <label>Url: </label><input type="text" id="url" name="url" onChange={props.handleBlogInputChange}/>
            <br/><br/>
            <button type="button" onClick={props.submitBlogForm}>Create</button>    
            </form>
            <br/>
            <button type="button" onClick={props.togoleCreateBlog}>Cancel</button>
        </div>
    )
}

export default BlogForm;