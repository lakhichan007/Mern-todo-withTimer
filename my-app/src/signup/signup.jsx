import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./signup.css"

const SignUp = () => {
    const naviator = useNavigate()
    const [user, setUser] = useState({})

    const newUser = () => {
        if (user.email && user.password && user.confirm_password) {
            if (user.password === user.confirm_password) {
                axios.post("http://localhost:5000/signUp", user)
                    .then((res) => {
                        alert(res.data.message)
                        naviator("/")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            else {
                alert("password and confirm_passwordare are not same!")
            }

        }
        else {
            alert("Input field can't be Empty!")
        }
    }
    return (
        <div className="signup-main-conatiner">
            <div id="signUp-container">
                <h1>Sign Up</h1>
                <input type="text" placeholder="Email Id"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    name="email" />
                <input type="text" placeholder="Password"
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    name="email" />
                <input type="text" placeholder="Confirm-Password"
                    onChange={(e) => setUser({ ...user, confirm_password: e.target.value })}
                    name="email" />
                <button id="signup-btn" onClick={newUser}>SignUp</button>
            </div>
        </div>
    )
}
export default SignUp