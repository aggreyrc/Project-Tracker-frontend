import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import {useDispatch} from 'react-redux'
import { loginSuccess, loginFailure } from "../Components/authSlice";
import './login.css'


function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();   //useDispatch() hook is used to dispatch actions to the Redux store
    const navigate = useNavigate();


    function handleSubmit(e) {

        e.preventDefault();

        fetch("http://127.0.0.1:5555/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json(); // Parse JSON if response is OK
            } else {
                throw new Error('Invalid username or password');
            }
        })
        .then((data) => {
            console.log(data);
            dispatch(loginSuccess({ user: data.user, isAdmin: data.isAdmin }));

            // Navigate based on user role
            navigate(data.isAdmin ? '/admin-dashboard' : '/student-dashboard');
        })
        .catch((error) => {
            console.error(error);
            dispatch(loginFailure('An error occurred during login'));
        });

        
     
    }


    return(
        <>

            <div className="login-container">

                <h1>Login in to your account</h1>

                <form onSubmit={handleSubmit} className="login-form">
                    <div>
                        <label>Email address:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />                   
                    </div>

                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Sign in</button>

                    <p>
                        Don't have an account? <Link to= "/signup"> Sign up here</Link>
                    </p>

                </form> 
            </div>
        </>
    )
}
export default Login