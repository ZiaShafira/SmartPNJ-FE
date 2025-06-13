import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarFaq from '../components/NavbarFaq';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";


const QuestionHistory = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  // Cek login saat mount
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
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  // Ambil pertanyaan berdasarkan filter & halaman
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const categoryParam = filterCategory !== 'Semua' ? `&category=${encodeURIComponent(filterCategory)}` : '';
      const response = await axios.get(`${API_BASE}/api/history?page=${page}&limit=${limit}${categoryParam}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setQuestions(response.data.questions || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error('Gagal mengambil riwayat pertanyaan:', error);
    }
    setLoading(false);
  };

  // Export ke Excel
  const handleExportExcel = async () => {
    try {
      const categoryParam = filterCategory !== 'Semua' ? `?category=${encodeURIComponent(filterCategory)}` : '';
      const response = await axios.get(`${API_BASE}/api/export-history-excel${categoryParam}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      });

      const disposition = response.headers['content-disposition'];
      const match = disposition && disposition.match(/filename="?(.+)"?/);
      const filename = match ? match[1] : 'chat_history.xlsx';

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Gagal mengekspor Excel:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setPage(1);
  };

  // Ambil data saat filter/category berubah
  useEffect(() => {
    if (token) fetchQuestions();
  }, [page, filterCategory]);


  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavbarFaq />
      <section className="bg-superdash text-white text-center py-5">
        <h2 className="fw-bold mb-2">Chat History</h2>
      </section>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <label className="me-2 fw-semibold">Filter Kategori:</label>
            <select
              className="form-select d-inline-block w-auto"
              value={filterCategory}
              onChange={handleCategoryChange}
            >
              <option value="Semua">Semua</option>
              <option value="SNBT">SNBT</option>
              <option value="SNBP">SNBP</option>
              <option value="Ujian Mandiri">Ujian Mandiri</option>
              <option value="Mandiri Prestasi">Mandiri Prestasi</option>
              <option value="RPL">RPL</option>
              <option value="PSDKU">PSDKU</option>
              <option value="Pascasarjana">Pascasarjana</option>
              <option value="WNBK">WNBK</option>
              <option value="Umum">Umum</option>
            </select>
          </div>
          <button onClick={handleExportExcel} className="btn btn-success">
            Export Excel
          </button>
        </div>

        {loading ? (
            <p>Memuat data...</p>
          ) : (
            <>
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Pertanyaan</th>
                    <th>Jawaban</th>
                    <th>Kategori</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q, index) => (
                    <tr key={q.id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>{q.question}</td>
                      <td>{q.answer || <span className="text-muted">Belum terjawab</span>}</td>
                      <td>{q.category || <span className="text-muted">-</span>}</td>
                    </tr>
                  ))}
                  {questions.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Tidak ada pertanyaan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {questions.length > 0 && (
                <nav>
                  <ul className="pagination justify-content-center mt-4">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setPage(page - 1)}>Sebelumnya</button>
                    </li>
                    {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
                      <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${page >= Math.ceil(total / limit) ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setPage(page + 1)}>Berikutnya</button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
      </div>
      <Footer />
    </div>
  );
};

export default QuestionHistory;