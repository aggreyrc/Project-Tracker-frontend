import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import {useDispatch} from 'react-redux'
import { loginSuccess, loginFailure } from "../Components/authSlice";
import './login.css'


function Login(){
    const [email, setEmail] = useState("");
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
            body: JSON.stringify({ email, password }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json(); // Parse JSON if response is OK
            } else {
                throw new Error('Invalid email or password');
            }
        })
        .then((data) => {
            console.log(data);

            const isAdmin = data.user && data.user.role === "admin";

             // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            dispatch(loginSuccess({ user: data.user, isAdmin }));
        
            // Navigate based on user role
            navigate(isAdmin ? '/admin-dashboard' : '/student-dashboard');

        })   
        .catch((error) => {
            console.error(error);
            dispatch(loginFailure('An error occurred during login'));
        });

    }


    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-semibold text-center mb-6" >Login in to your account</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label>Email address:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />                   
                    </div>

                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        Sign in</button>

                    <p>
                        Don't have an account? <Link to= "/signup" className="text-blue-500 hover:text-blue-600"> Sign up here</Link>
                    </p>

                </form> 
            </div>
        </div>
    )
}
export default Login