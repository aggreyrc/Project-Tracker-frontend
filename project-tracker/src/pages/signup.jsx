import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setUser, setError,setLoading } from "../Components/authSlice";
import './signup.css'
import { Link } from "react-router-dom";

function Signup(){

    const dispatch =useDispatch();
    const {loading, error} = useSelector((state) => state.auth);

    const[username, setUsername] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[role, setRole] = useState("")
    const[isAdmin, setIsAdmin] = useState("")



    return(
    
        <>
         

          <div className="signup-container">

             <form className="signup-form">
                <h2>SIGN UP PAGE</h2>

                
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Role:</label>
                    <select
                         value={role}
                         onChange={(event) => setRole(event.target.value)}
                         required
                    
                    >
                         <option value="student"></option>
                         <option value="admin"></option>
                        
                    </select>
                
                </div>

                <div>
                    <label>Admin:</label>
                    <input
                        type="checkout"
                        checked={isAdmin}
                        onChange={(event) => setIsAdmin(event.target.value)}
                    />
                </div>

                <button
                   type="submit"
                   disabled={loading}
                >
                {loading ? "Signing up..." : "Sign Up"}

                </button>

                <div className="footer">
                 Already have an account? <Link to="/login">Login</Link>

             </div>
             </form>

             {error && <p>{error}</p>}

            

          </div>
        </>
    )
}
export default Signup