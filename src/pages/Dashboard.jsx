// pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import StatSummary from "../components/StatsSummary";
import ChatbotCharts from "../components/ChatbotCharts";
import QuickActions from "../components/QuickActions";
import NavbarDashboard from "../components/NavbarDashboard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const [totalIndexedQA, setTotalIndexedQA] = useState(0);
  const navigate = useNavigate();

  const [dataLine, setDataLine] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // 🔄 Fetch data dari API backend Flask kamu
    fetch(`${API_BASE}/api/dashboard-stats`)
      .then((res) => res.json())
      .then((data) => {
        setTotalQuestions(data.total_questions_today || 0);
        setTotalFiles(data.total_files_uploaded || 0);
        setTotalIndexedQA(data.total_qa_indexed || 0);
        setDataLine(data.questions_per_day || []);
        setDataPie(data.top_categories || []);
      })
      .catch((err) => console.error("Gagal ambil data dashboard:", err));
  }, []);

  const handleQuickAction = (action) => {
  switch (action) {
    case "base":
      navigate("/base-knowledge");
      break;
    case "faq":
      navigate("/faq");
      break;
    case "history":
      navigate("/history");
      break;
    case "admin":
      navigate("/manage-admin");
      break;
    default:
      break;
    }
 };

  return (
  <div className="d-flex flex-column min-vh-100">
    <NavbarDashboard />
        {/* HEADER */}
      <section className="bg-superdash text-white text-center py-5">
        <h2 className="fw-bold mb-2">Welcome to Dashboard</h2>
      </section>
    <div className="container my-4 flex-grow-1">

      {/* Ringkasan Statistik */}
      <StatSummary
        totalQuestions={totalQuestions}
        totalFiles={totalFiles}
        totalIndexedQA={totalIndexedQA}
      />

      {/* Quick Action */}
      <QuickActions onAction={handleQuickAction} />
      
      {/* Grafik Aktivitas */}
      <div className="my-5">
        <ChatbotCharts dataLine={dataLine} dataPie={dataPie} />
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default Dashboard;