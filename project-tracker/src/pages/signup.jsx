import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../Components/authSlice";
import './signup.css';
import { Link, useNavigate } from "react-router-dom";


function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    

    // Open modal after successful signup
    function handleSignUpSubmit(event) {
        event.preventDefault();

        if (!termsAccepted) {
            setError("You must agree to the Terms and Conditions to sign up.");
            return;
        }

        const formData = {
            username,
            email,
            password,
            role,
            is_admin: isAdmin,
        };

        dispatch(setLoading(true));

        console.log("Sending signup request with data:", formData);

        fetch('http://127.0.0.1:5555/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((res) => res.json().then((result) => ({ res, result })))
        .then(({ res, result }) => {
            console.log("Response Result:", result);

            if (res.ok) {
                console.log("Signup was successful, in res.ok block");

                // Store the user's email in localStorage
                localStorage.setItem("userEmail", result.user.email);
                
                dispatch(setUser(result.user)); // Store user data in Redux on success
                
                setSuccessMessage("Signup successful! Please check your email for the verification code.");
                navigate('/verify')
            } else {
                dispatch(setError(result.error)); // Store error in Redux if there's an issue
            }
        })
        .catch((err) => {
            dispatch(setError("An error occurred during signup"));
            console.error("Signup error:", err)
        })
        .finally(() => {
            dispatch(setLoading(false));
            dispatch(setError(null)); // Clear error after the operation is complete
        });
    }

    

    return (
        <>
            <div className="signup-container">
               
                    <form onSubmit={handleSignUpSubmit} className="signup-form">
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
                                id="role"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                                required
                            >
                                <option value="" disabled>Choose an option</option>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="terms">
                            <label htmlFor="admin">Admin:</label>
                            <input
                                type="checkbox"
                                id="admin"
                                checked={isAdmin}
                                onChange={(event) => setIsAdmin(event.target.checked)}
                            />
                        </div>

                        <div className="terms">
                            <label htmlFor="terms">I agree to the Terms and conditions</label>
                            <input
                                type="checkbox"
                                name="terms"
                                checked={termsAccepted}
                                onChange={(event) => setTermsAccepted(event.target.checked)}
                            />
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>

                        {error && <p>{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}

                        <div className="footer">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </form>
              
            </div>

            
          
        </>
    );
}

export default Signup;
