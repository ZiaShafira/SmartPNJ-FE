import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Footer2 from '../components/Footer2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL;


  // Dummy login role check
  const handleLogin = (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  fetch(`${API_BASE}/api/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ username, password })
})
  .then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Login gagal");
    }

    // ✅ Simpan token ke localStorage
    localStorage.setItem("token", data.token);

    return data;
  })
  .then(() => {
    navigate("/dashboard");
  })
  .catch((err) => {
    setError(err.message);
  })
  .finally(() => {
    setLoading(false);
  });
};



  return (
    <div className="d-flex flex-column min-vh-100 bg-superdash">

      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 text-center text-white px-3">
        <h1 className="fw-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="mb-5 text-white">
          Manage your chatbot knowledge efficiently
        </p>

        <form
          onSubmit={handleLogin}
          className="w-100"
          style={{ maxWidth: "500px", textAlign: "left" }}
        >
          {error && <div className="alert alert-danger text-center">{error}</div>}

          <div className="mb-3">
            <label className="form-label text-white">Username</label>
            <input
              type="text"
              className="form-control px-3 py-2"
              placeholder="Enter the question here"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="form-text text-white-50">Be clear and concise</div>
          </div>

          <div className="mb-4">
            <div className="input-group bg-light rounded">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control px-3 py-2"
                placeholder="Enter the answer here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <i className="bi bi-eye-slash" /> : <i className="bi bi-eye" />}
              </button>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-dark fw-semibold" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
      <Footer2 />
    </div>
  );
};

export default Login;
