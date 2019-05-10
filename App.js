import React, { Component } from 'react';
import reactLogo from './logo-react.svg';
import djangoLogo from './logo-django.svg';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Homepage from './router'
import './App.css';
import LoginComponent from './login';

class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        content: "main page",
        userName: "",
        password: "",
        emailId: "",
        phoneNumber: "",
        userObject: {username: "", password: "", emailId: "", phoneNumber: ""}
    }

 
  renderRegisterForm = event => {
      {this.setState({content: "register form"})}
  }
  
  renderLoginPage = event => {
      {this.setState({content: "login page"})}
  }
  
  updateStateUsername = event => {
      {this.setState({userName: event.target.value})}
  }
  
  updateUserEmailId = event => {
      {this.setState({emailId: event.target.value})}
  }
  
  updatePhoneNumber = event => {
      {this.setState({phoneNumber: event.target.value})}
  }
  
  updateStatePassword = event => {
      {this.setState({password: event.target.value})}
  }
  
 
  
  InitializeUserObject(response) {
      let userObject = Object.assign({}, this.state.userObject)
      userObject.username = response.username
      userObject.password = response.password
      userObject.emailId = response.emailId
      userObject.phoneNumber = response.phoneNumber
      this.setState({userObject})
      this.setState({content: "Home-Page"})
  }
  
  loginUser = event => {
      let userName = this.state.userName
      let password = this.state.password
      
      
      let userLoginDetailsObject =  
           JSON.stringify({
               username: userName,
               password: password
           })
            
      try {
          fetch('http://127.0.0.1:8000/login_user/',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: userLoginDetailsObject
          })
          .then(response => response.json())
          .then(resp => this.InitializeUserObject(resp) )      
      }
      catch(err) {
          console.log(err, "Error")
      }
  }
  
  registerUser = event => {
      let userName = this.state.userName
      let password = this.state.password
      let emailId = this.state.emailId
      let phoneNumber = this.state.phoneNumber
      
      let userDetailsObject = JSON.stringify({
          username: userName,
          password: password,
          emailId: emailId,
          phoneNumber: phoneNumber
      })
      
      try {
          fetch('http://127.0.0.1:8000/register_user/', {
              method: 'POST',
              headers: {
                   'Content-Type': 'application/json'
              },
              body: userDetailsObject
          })
          .then(res => console.log(res))
          .then(data => this.setState({content: "main page"}))
      }
      catch(err) {
          console.log(err, "Error ")
      }
  }
  
  loginForm() {
      
      return (
        <div> 
          Enter Username and Password to login
          <br />
          Username:
          {" "}
          <input type="text" value= {this.state.userName} onChange = {this.updateStateUsername} />
          <br />
          Password: 
          {" "}
          <input type="text" value = {this.state.password} onChange = {this.updateStatePassword} />
          <br /> 
           {" "}
          <input type="button" value ="Login" onClick = {this.loginUser} />
          </div>
      )
  }

  renderUserHomepage() {
      return (
        <div>
          Welcome Back {this.state.userObject.username}!
          {" "}
          {" "}
          </div>
          
      )
  }
  
  registerForm() {
      
      return (
        <div>
          UserName: 
          {" "}
          
          <input type="text" value = {this.state.userName} onChange = {this.updateStateUsername} />
          <br />
          Password: 
          {" "}
          <input type="text" value = {this.state.password} onChange = {this.updateStatePassword} />
          <br />
          Email:
          {" "}
          <input type="text" value= {this.state.emailId} onChange = {this.updateUserEmailId} />
          <br />
          Phone Number:
          {" "}
          <input type="text" value = {this.state.phoneNumber} onChange = {this.updatePhoneNumber} />
          <br />
          <br />
          <input type = "button" value = "Submit" onClick = {this.registerUser} />
           </div>
      )
  }
    
  renderMainPage() {
    return (
                <div>
                    <input type = "button" value= "Register" onClick = {this.renderRegisterForm}/>
                    {" "}
                    <input type = "button" value = "Login" onClick = {this.renderLoginPage} />
                </div>
            )
  }

    render() {
        if (this.state.content == "main page") {
            return (
                <div> 
                    {this.renderMainPage()}
                </div>
            ) 
        } else if (this.state.content == "register form") {
                return (
                    <div> 
                        {this.registerForm()}
                    </div> 
                )
            } else if (this.state.content == "login page") {
                return (
                    <div> 
                        <LoginComponent />
                    </div>
                )
            }else if (this.state.content == "Home-Page"){
                return (<Homepage username = {this.state.userName} />)
            }
            else {
                return (
                    <div> 
                    Main Page
                     </div>
                )
            }
    }
}

export default App;
