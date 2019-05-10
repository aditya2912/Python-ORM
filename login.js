import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        userName: "",
        password: "",
        userObject: {username: "", password: "", emailId: "", phoneNumber: "" }
    }

    render() {
        return (
            <LoginRouter />
        )
    }

InitializeUserObject(response) {
      let userObject = Object.assign({}, this.state.userObject)
      userObject.username = response.username
      userObject.password = response.password
      userObject.emailId = response.emailId
      userObject.phoneNumber = response.phoneNumber
      this.setState({userObject})
      this.setState({content: "Home-Page"})        
            
            
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
            
function LoginForm() {
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
            
function LoginRouter() {
    <Router> 
        <div>
            <nav>
              <Link to="/login_page/"> </Link>
            </nav>
            <Route path="/login_page/" exact component={LoginForm} />
        </div>
    </Router>
    }            

}
export default LoginComponent;