import NavbarUser from "../components/NavbarUser";
import Footer2 from "../components/Footer2";
import { useEffect, useState } from "react";
import logo2 from "../assets/logo.png"; // Ubah sesuai lokasi logo kamu


const MainUser = () => {
  const [faqs, setFaqs] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/faq`)
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error("Gagal ambil FAQ:", err));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarUser />

        {/* HOME */}
        <section id="home" className="bg-superdash text-white" style={{ padding: '200px 0' }}>
            <div className="container">
                <div className="row align-items-center">
                {/* Kiri: Text */}
                <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
                    <h2 className="fw-bold">Selamat Datang di Smart PNJ!</h2>
                    <p className="mt-2">Siap melayani pertanyaan seputar Penerimaan Mahasiswa Baru di <br/><strong>Politeknik Negeri Jakarta</strong></p>
                    <a href="/chatbot" className="btn btn-light mt-3 px-4">Mulai Percakapan</a>
                </div>

                {/* Kanan: Logo */}
                <div className="col-md-6 text-center">
                    <div className="bg-white rounded-circle d-inline-block p-4">
                    <img src={logo2} alt="Smart PNJ Logo" style={{ width: '250px', height: '250px' }} />
                    </div>
                </div>
                </div>
            </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-white" style={{ padding: '200px 0' }}>
            <div className="container">
                <h3 className="fw-bold text-center mb-5">About Us</h3>
                <div className="row align-items-center">
                {/* Kiri: Logo */}
                <div className="col-md-4 text-center mb-4 mb-md-0">
                    <img
                    src={logo2}
                    alt="Smart PNJ Logo"
                    className="img-fluid"
                    style={{ maxWidth: '250px' }}
                    />
                </div>

                {/* Kanan: Teks */}
                <div className="col-md-8 mb-4 mb-md-0 text-center text-md-start">
                    <p>
                    <strong style={{ color: '#0F8390' }}>SmartPNJ</strong> adalah platform yang dikembangkan untuk membantu calon mahasiswa Politeknik Negeri Jakarta dalam mengakses informasi Penerimaan Mahasiswa Baru (PMB).
                    </p>
                    <p>
                    Chatbot ini dirancang agar responsif, informatif, dan mudah digunakan, sehingga pengguna dapat memperoleh jawaban cepat mengenai jalur masuk, jadwal pendaftaran, program studi, hingga pertanyaan umum seputar PMB.
                    </p>
                </div>
                </div>
            </div>
        </section>


        {/* FAQ */}
        <section id="faq" className="bg-superdash text-white" style={{ paddingBottom: '300px', paddingTop: '100px' }}>
        <div className="container">
            <h3 className="text-center mb-3">Frequently Ask Question</h3>
            <p className="text-center mb-5">Temukan jawaban atas pertanyaan paling umum tentang penerimaan mahasiswa baru.</p>

            {/* Dropdown Filter */}
            <div className="row justify-content-center mb-4">
            <div className="col-md-3">
                <select
                className="form-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                >
                <option value="">Semua Kategori</option>
                <option value="SNBP">SNBP</option>
                <option value="SNBT">SNBT</option>
                <option value="Ujian Mandiri">Ujian Mandiri</option>
                <option value="Mandiri Prestasi">Mandiri Prestasi</option>
                <option value="PSDKU">PSDKU</option>
                <option value="Pascasarjana">Pascasarjana</option>
                <option value="Kerjasama">Kerjasama</option>
                <option value="RPL">RPL</option>
                <option value="WNBK">WNBK</option>
                <option value="Umum">Umum</option>
                </select>
            </div>
            </div>

            {/* Accordion FAQ */}
            {faqs.length === 0 ? (
            <p className="text-center text-muted">Belum ada FAQ yang tersedia.</p>
            ) : (
            <div className="accordion" id="faqAccordion" style={{ marginTop: '50px' }}>
                {faqs
                .filter((faq) => !filterCategory || faq.category === filterCategory)
                .slice(0, 5)
                .map((faq, index) => (
                    <div className="accordion-item" key={faq.id}>
                    <h2 className="accordion-header" id={`heading${faq.id}`}>
                        <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${faq.id}`}
                        aria-expanded="false"
                        aria-controls={`collapse${faq.id}`}
                        >
                        {index + 1}. {faq.question}
                        </button>
                    </h2>
                    <div
                        id={`collapse${faq.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${faq.id}`}
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                        {faq.answer}
                        </div>
                    </div>
                    </div>
                ))}

                {faqs.filter((faq) => !filterCategory || faq.category === filterCategory).length === 0 && (
                <p className="text-center text-muted">Tidak ada FAQ dalam kategori ini.</p>
                )}
            </div>
            )}
        </div>
        </section>
      <Footer2 />
    </div>
  );
};

export default MainUser;
