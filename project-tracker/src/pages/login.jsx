import { Link } from "react-router-dom"
import './login.css'

function Login(){

    return(
        <>
            <h1>login</h1>

            <div className="login-container">

                <form className="login-form">
                    <div>
                        <label>Email adddress:</label>
                        <input
                            type="text"
                            required
                        />                   
                    </div>

                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
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