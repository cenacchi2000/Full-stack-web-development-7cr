import React from 'react'
const Login = (props) => (
    <div>
        <p>Login to application</p>
        <form id="loginForm" onSubmit={props.submitLoginForm}>
        <input type="text" id="username" name="username" placeholder="User name" onChange={props.handleInputChange} />
        <br/><br/>
        <input type="password" id="password" name="password" placeholder="Password" onChange={props.handleInputChange}/>
        <br/>
        { props.error? (<span style={{color:'red'}}>{props.error}</span>):(<span></span>) }
        <br/>
        <button type="button" className="float-left btn btn-info" onClick={props.submitLoginForm}>Log In</button>    
        </form>
    </div>
)

export default Login