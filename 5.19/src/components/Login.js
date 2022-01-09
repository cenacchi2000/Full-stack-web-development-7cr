import React from 'react'
import PropTypes from 'prop-types' 
const Login = (props) => (
    <div>
        <p>Login to application</p>
        
        { props.error.length? (<span style={{color:'red', backgroundColor: '#b6b4b4', border:'2px solid red', padding:'5px'}}>{props.error}</span>):(<span></span>) }
        <br/><br/>
        <form id="loginForm" onSubmit={props.submitLoginForm}>
        <input type="text" id="username" name="username" placeholder="User name" onChange={props.handleInputChange} />
        <br/><br/>
        <input type="password" id="password" name="password" placeholder="Password" onChange={props.handleInputChange}/>
        <br/><br/>
        <button type="button" onClick={props.submitLoginForm}>Log In</button>    
        </form>
    </div>
)

Login.propTypes = {
    submitLoginForm : PropTypes.func.isRequired,
    handleInputChange : PropTypes.func.isRequired,
    username : PropTypes.string.isRequired,
    password : PropTypes.string.isRequired
}

export default Login