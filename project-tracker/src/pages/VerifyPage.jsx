import './VerifyPage.css'


import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyPage() {
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const email = localStorage.getItem("userEmail");  // Assuming email is stored after signup

    // Check if email exists in localStorage
    if (!email) {
        return <p>No email found. Please sign up first.</p>;
    }
    
    async function handleVerificationSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5555/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, verification_code: verificationCode }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Verification failed");
            }

            const result = await response.json();

            if (result.message) {
                setSuccessMessage(result.message);
                setTimeout(() => {
                    navigate("/login");  // Redirect to login page after successful verification
                }, 2000); // Delay before redirecting
            } else {
                setVerificationError(result.error || "Verification failed.");
            }
        } catch (err) {
            setVerificationError(err.message);
        }
    }

    return (
        <div className="verify-container">
            <h3>Email Verification</h3>
            <p>Enter the verification code sent to your email:</p>
            <form onSubmit={handleVerificationSubmit}>
                <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                />
                <button type="submit">Confirm Verification</button>
            </form>

            {verificationError && <p className="error">{verificationError}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    );
}

export default VerifyPage;
