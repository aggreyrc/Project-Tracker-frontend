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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
           <h3 className="text-center text-2xl font-semibold mb-4">Email Verification</h3>
           <p className="text-center text-gray-600 mb-6">Enter the verification code sent to your email:</p>

           <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confirm Verification
              </button>
            </form>

        {verificationError && (
            <p className="text-red-500 text-center mt-4">{verificationError}</p>
        )}
        {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}
    </div>
</div>

    );
}

export default VerifyPage;
