import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import './Login.css';
import { useNavigate } from "react-router-dom";
import NavbarAccount from '../components/NavbarAccount';

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserBlocked, setCurrentUserBlocked] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    password: ''
  });

  const token = localStorage.getItem("token");
  

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  // Cek login user
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE}/api/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then((data) => {
      setCurrentUserId(data.id);
      setCurrentUserBlocked(data.is_blocked);
    })
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
}, []);

  // Ambil daftar admin
  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data admin:", err);
        setLoading(false);
      });
  }, [token]);

  const refreshData = () => {
    fetch(`${API_BASE}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setAdmins(data));
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ ...toast, show: false }), 4000);
  };

  const handleCreate = () => {
  const { username, email, password } = newAdmin;

  if (!username.trim() || !email.trim() || !password.trim()) {
    showToast('danger', 'Semua field wajib diisi.');
    return;
  }

  if (password.length < 8) {
    showToast('danger', 'Password harus minimal 8 karakter.');
    return;
  }

  if (!isValidEmail(email)) {
    showToast('danger', 'Format email tidak valid.');
    return;
  }

  fetch(`${API_BASE}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newAdmin)
  })
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      refreshData();
      setNewAdmin({ username: '', email: '', password: '' });
      showToast('success', 'Admin berhasil ditambahkan');
    })
    .catch(() => showToast('danger', 'Gagal menambahkan admin'));
};


  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        refreshData();
        showToast('success', 'Admin berhasil dihapus');
      })
      .catch(() => showToast('danger', 'Gagal menghapus admin'));
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-white position-relative">
      <NavbarAccount />

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

      <section className="bg-superdash text-white text-center py-5">
        <h2 className="fw-bold mb-2">Manage Admin Account</h2>
        <p className="mb-0">Create or delete admin accounts</p>
      </section>

      <main className="container py-5">
        <div className="mb-5">
          <h4 className="fw-bold mb-3">Create New Admin</h4>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <div className="input-group bg-light rounded">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control px-3 py-2"
                placeholder="Enter the password here"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
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
            <div className="col-md-1">
              <button className="btn btn-primary w-100" onClick={handleCreate} disabled={loading}>
                Create
              </button>
            </div>
          </div>
        </div>

        <h4 className="fw-bold mb-3">Daftar Admin</h4>
        {loading ? (
          <p>Loading...</p>
        ) : admins.length === 0 ? (
          <p className="text-muted">Belum ada admin yang terdaftar.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Dibuat</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr key={admin.id}>
                    <td>{index + 1}</td>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>
                      {admin.created_at &&
                        new Date(admin.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                    </td>
                    <td>
                      {admin.is_blocked ? (
                        <span className="badge bg-danger">Terblokir</span>
                      ) : (
                        <span className="badge bg-success">Aktif</span>
                      )}
                    </td>
                    <td>
                      {admin.id !== currentUserId && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setSelectedAdminId(admin.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showDeleteModal && (
          <>
            <div className="modal show fade d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Konfirmasi Hapus Admin</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowDeleteModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Apakah kamu yakin ingin menghapus admin ini?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setShowDeleteModal(false);
                        if (selectedAdminId) handleDelete(selectedAdminId);
                      }} disabled={loading}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ManageAdmin;