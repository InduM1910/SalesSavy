import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import './assets/Style.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        if (!username.trim() || !password.trim()) {
            setError("Username and password are required");
            return;
          }

        try {
            const response = await fetch('http://localhost:9090/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User logged in successfully:', data);

                // Navigate based on user role
                if (data.role === 'CUSTOMER') {
                    navigate('/customerhome');
                } else if (data.role === 'ADMIN') {
                    navigate('/adminhome');
                } else {
                    navigate('/');
                }
            } else {
                const errorMessage =
                  data.error || "Something went wrong. Please try again.";
                throw new Error(errorMessage);
              }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="page-layout">
        <div className="page-container">
            <div className="form-container">
                <h1 className="form-title">Login</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignIn} className="form-content">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="form-button">
                        Sign In
                    </button>
                </form>
                <div className="form-footer">
                    {/* Updated navigation links */}
                    <Link to="/register" className="form-link" style={{ marginRight: '20px' }}>
                        New User? Sign up here
                    </Link>
                    <Link to="/forgot-password" className="form-link">
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
}
