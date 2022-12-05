import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./login.css"

const Login = () => {
    const [user, setUser] = useState({})
    const naviator = useNavigate()
    const oldUser = () => {
        if (user.email && user.password) {
            axios.post("http://localhost:5000/logIn", user)
                .then(res => {
                    if (res.data.message === "success") {
                        window.localStorage.setItem("token", res.data.token)
                        window.localStorage.setItem("user", res.data.email)
                        alert("Sucessfully logged In")
                        naviator("/home")
                    }
                    else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            alert("user field can't be Empty!")
        }
    }
    return (
        <div id="main-container">
            <div id="main-container-login">
                <div id="gif-box">
                    <img src={require("./images/login.gif")} alt=""/>
                </div>
                <div id="login-container">
                    <h1>Log In</h1>
                    <input type="text" placeholder="Emai Id" name="email"
                        onChange={(e) => (setUser({ ...user, email: e.target.value }))}
                    />
                    <input type="password" placeholder="password" name="email"
                        onChange={(e) => (setUser({ ...user, password: e.target.value }))}
                    />
                    <button id="login-btm"  onClick={oldUser}>Log In</button>
                    <div style={{display:"flex",gap:"1vw"}}>
                        <p>Not Registered?</p>
                        <a href="/signUp">Sign Up here...!</a>
                    </div>
                    
                    
                    
                </div>
            </div>
        </div>
    )
}
export default Login