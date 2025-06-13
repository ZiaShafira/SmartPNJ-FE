import React, { useState, useEffect } from "react";
import './Login.css';
import NavbarAccount from "../components/NavbarAccount";
import Footer2 from "../components/Footer2";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setUser({ username: data.username, email: data.email });
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ ...toast, show: false }), 4000);
  };

  const handlePasswordUpdate = () => {
  if (!newPassword.trim()) {
    showToast("danger", "Password baru tidak boleh kosong.");
    return;
  }
  if (newPassword.length < 8) {
  showToast("danger", "Password harus minimal 8 karakter.");
  return;
}

  setLoading(true); // ⏳ mulai loading

  fetch(`${API_BASE}/api/users/reset-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ password: newPassword })
  })
    .then((res) => {
      if (!res.ok) throw new Error("Gagal reset password");
      return res.json();
    })
    .then(() => {
      showToast("success", "Password berhasil diperbarui.");
      setNewPassword("");

      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, 1200);
    })
    .catch(() => {
      showToast("danger", "Gagal memperbarui password.");
    })
    .finally(() => {
      setLoading(false); // ✅ selesai loading
    });
};



  return (
    <div className="bg-superdash d-flex flex-column min-vh-100">
        <NavbarAccount />
              {/* HEADER */}
        <section className="bg-superdash text-white text-center py-5">
            <h2 className="fw-bold mb-2">My Account</h2>
        </section>
        
        <div className="container py-5 position-relative">

        <div className="mb-3 col-md-6 mx-auto">
            <label className="form-label text-white">Username</label>
            <input type="text" className="form-control" value={user.username} disabled />
        </div>

        <div className="mb-3 col-md-6 mx-auto">
            <label className="form-label text-white">Email</label>
            <input type="text" className="form-control" value={user.email || ""} disabled/>
        </div>

        <div className="mb-3 col-md-6 mx-auto">
            <label className="form-label text-white">Password Baru</label>
            <div className="input-group bg-light rounded">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control px-3 py-2"
                placeholder="Masukan password baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
        <div className="text-center">
            <button className="btn btn-primary" onClick={handlePasswordUpdate} disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </button>
        </div>
        {/* TOAST */}
        {toast.show && (
            <div
            className={`toast align-items-center text-bg-${toast.type} position-fixed bottom-0 end-0 m-4 show`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ zIndex: 9999 }}
            >
            <div className="d-flex">
                <div className="toast-body">{toast.message}</div>
                <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToast({ ...toast, show: false })}
                ></button>
            </div>
            </div>
        )}
        </div>
        <Footer2 />
    </div>
  );
};

export default MyAccount;