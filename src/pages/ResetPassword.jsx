import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const API_BASE = import.meta.env.VITE_API_URL;

  const handleReset = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password.length < 8) {
    showToast('danger', 'Password harus minimal 8 karakter.');
    return;
  }
  
    setLoading(true);

    fetch(`${API_BASE}/api/users/reset-password-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Gagal reset password');
        setMessage(data.message);
        setPassword('');
        setTimeout(() => navigate('/login'), 3000);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-superdash text-white px-3">
      <h1 className="fw-bold mb-4">Reset Password</h1>
      <form onSubmit={handleReset} className="w-100" style={{ maxWidth: '400px' }}>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {message && <div className="alert alert-success text-center">{message}</div>}

        <div className="mb-3">
          <label className="form-label text-white">Password Baru</label>
          <div className="input-group bg-light rounded">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control px-3 py-2"
              placeholder="Masukkan password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
          <button type="submit" className="btn btn-light fw-semibold" disabled={loading}>
            {loading ? "Memproses..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;