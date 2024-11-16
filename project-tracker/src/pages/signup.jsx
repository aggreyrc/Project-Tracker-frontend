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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    

    // Open modal after successful signup
    function handleSignUpSubmit(event) {
        event.preventDefault();

        if (!termsAccepted) {
            dispatch(setError("You must agree to the Terms and Conditions to sign up."));
            return;
        }

        if(password !== confirmPassword){
            dispatch(setError("Password do not match"))
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
        
            <div className="min-h-screen flex items-center justify-center bg-gray-100">

                <div  className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" >

                   <h2 className="text-3xl font-semibold text-center mb-6">Sign Up </h2>
               
                    <form onSubmit={handleSignUpSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700"  >Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700"  >Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" >Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" >Confirm Password:</label>
                            <input
                                 type="password"
                                 id="confirmPassword"
                                 value={confirmPassword}
                                 onChange={(event) => setConfirmPassword(event.target.value)}
                                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                 required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" >Role:</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Choose an option</option>
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="terms">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="admin">Admin:</label>
                            <input
                                type="checkbox"
                                id="admin"
                                checked={isAdmin}
                                onChange={(event) => setIsAdmin(event.target.checked)}
                                className="h-4 w-4"
                            />
                        </div>

                        <div className="terms">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="terms">I agree to the Terms and conditions</label>
                            <input
                                type="checkbox"
                                name="terms"
                                checked={termsAccepted}
                                onChange={(event) => setTermsAccepted(event.target.checked)}
                                className="h-4 w-4"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={loading} 
                            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                            {loading ? "Signing up..." : "Sign Up"}
                        </button>

                        {error && <p>{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}

                        <div className="footer">
                            Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600" >Login</Link>
                        </div>
                    </form>
                </div>
            </div>

            
          
        
    );
}

export default Signup;
