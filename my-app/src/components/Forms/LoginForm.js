import React, { useState } from "react";
import { Form } from './Styles';
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosWithAuth } from "../../utils/axiosWithAuth"

const LoginForm = () => {

    const initialExistingUser = {
        loginUsername: '',
        loginPassword: ''
    }

    const [ existingUser, setExistingUser] = useState(initialExistingUser);

    const { loginUsername, loginPassword } = existingUser;
//Function

const userLogIn = (newUser) => { 
    
      axios
        .post(
          "https://nchampag-watermyplants.herokuapp.com/login",
          `grant_type=password&username=${newUser.username}&password=${newUser.password}`,
          {
            headers: {
              Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          console.log("cat", res);
          localStorage.setItem("token", res.data.access_token);
        let plantUser = localStorage.getItem("username");
                axiosWithAuth()
                  .get(`plants/userName/${plantUser}`)
                  .then(res => {
                      console.log("res inside userName", res)
                })
                  })
              .catch(err => {
                console.log(err.response)
            })
        .catch(err => {
          console.dir(err);
        });

   };



///EndFunction
    // Handler Functions
    const handleInputChange = (e) => {
        setExistingUser({
            ...existingUser,
            [e.target.id]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        if(loginUsername && loginPassword) {
            e.preventDefault();
            userLogIn({username: existingUser.loginUsername, password: existingUser.loginPassword});
            console.log("Object made in login form",{username: existingUser.loginUsername, password: existingUser.loginPassword});
            localStorage.setItem("username", existingUser.loginUsername)
            // console.log("existingUser", existingUser);
            // ON SUBMIT, DO WHAT YOU WANT WITH THE EXISTING USER OBJECT HERE :)
            setExistingUser(initialExistingUser);

        }
    }
    
    return (
        <Form autoComplete="off">
            <div className="form-header">
                <h1>Login</h1>
                <p>Keep your plants alive</p>
            </div>

            <div className="form-inputs">
                <label htmlFor="username">Username</label>
                <input type='text' id="loginUsername" name='username' onChange={handleInputChange} value={loginUsername} placeholder='Username' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="password">Password</label>
                <input type='password' id="loginPassword" name='password' onChange={handleInputChange} value={loginPassword} placeholder='Password' required/>
            </div>

            <button type='submit' onClick={handleFormSubmit}>
                <Link to="/">Login</Link>
            </button>

            <p className="text-link">Not a member yet? <Link to="/register">Register here</Link></p>
        </Form>
    )
}

export default LoginForm;