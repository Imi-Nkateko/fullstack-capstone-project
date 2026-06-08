import React, { useState } from 'react';
// Task 1: Import urlConfig from `giftlink-frontend/src/config.js`
import { urlConfig } from '../../config';
// Task 2: Import useAppContext `giftlink-frontend/context/AuthContext.js`
import { useAppContext } from '../../context/AuthContext';
// Task 3: Import useNavigate from `react-router-dom`
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Task 4: Include a state for error message.
    const [showerr, setShowerr] = useState('');

    // Task 5: Create a local variable for `navigate` and `setIsLoggedIn`.
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    const handleRegister = async () => {
        try {
            // Call the registration API
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                // Task 6: Set method
                method: 'POST',
                // Task 7: Set headers
                headers: {
                    'content-type': 'application/json',
                },
                // Task 8: Set body to send user details
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Store tokens safely on client side
                sessionStorage.setItem('auth-token', data.authtoken);
                sessionStorage.setItem('email', data.email);
                
                // Update global state and redirect
                setIsLoggedIn(true);
                navigate('/app');
            } else {
                // Handle server response validation errors
                setShowerr(data.error || 'Registration failed. Please try again.');
            }

        } catch (e) {
            console.log("Error fetching details: " + e.message);
            setShowerr('Network connection error. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded shadow-sm">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* Conditional error message display */}
                        {showerr && (
                            <div className="alert alert-danger" role="alert">
                                {showerr}
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label font-weight-bold">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label font-weight-bold">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label font-weight-bold">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label font-weight-bold">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-primary w-100 mb-3 font-weight-bold" onClick={handleRegister}>
                            Register
                        </button>

                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
