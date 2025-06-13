import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import Navbar from '../components/Navbar';
import Footer2 from '../components/Footer2';
import './Login.css'; // opsional kalau kamu masih butuh

const Chatbot = () => {
  const chatContainerRef = useRef(null);

  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    if (!showChat) setShowChat(true);

    const userMessage = { text: question, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/api/ask`, {
        question: question,
      });

      const botAnswer = response.data.answer;
      const botMessage = { text: botAnswer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);

      const isValidAnswer =
        botAnswer &&
        botAnswer.length > 10 &&
        !botAnswer.toLowerCase().includes("maaf") &&
        !botAnswer.toLowerCase().includes("tidak tersedia") &&
        !botAnswer.toLowerCase().includes("tidak relevan") &&
        !botAnswer.toLowerCase().startsWith("halo") &&
        !botAnswer.toLowerCase().includes("bisa saya bantu");

      if (isValidAnswer) {
        try {
          await axios.post(`${API_BASE}/api/submit-question`, {
            question: question,
            answer: botAnswer,
          });
        } catch (err) {
          console.warn('Gagal simpan ke DB:', err.message);
        }
      } else {
        console.log("❌ Jawaban tidak disimpan:", botAnswer);
      }

    } catch (error) {
      console.error('Gagal menjawab:', error);
      const errorMessage = { text: 'Maaf, terjadi kesalahan.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-superdash">
      <Navbar />
      <main className="flex-grow-1">
        {!showChat ? (
          <div className="container py-5 text-center text-white">
            <h1 className="mb-3">Selamat Datang</h1>
            <p className="mb-4">Tanyakan apa pun kepada saya tentang PMB, saya siap membantu!</p>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="form-control w-50"
                placeholder="Tulis pertanyaanmu..."
              />
              <button type="submit" className="btn btn-dark">
                {loading ? 'Mengirim...' : 'Kirim'}
              </button>
            </form>
          </div>
        ) : (
          <div className="d-flex justify-content-center" style={{ height: '85vh' }}>
            <div className="d-flex flex-column px-3 w-100" style={{ maxWidth: '800px' }}>
              <ChatMessages messages={messages} chatContainerRef={chatContainerRef} />
              <ChatInput
                question={question}
                setQuestion={setQuestion}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          </div>
        )}
      </main>
      <Footer2 />
    </div>
  );
};

export default Chatbot;
