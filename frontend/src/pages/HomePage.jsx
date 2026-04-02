// frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { getSigns } from '../services/api';
import SignCard from '../components/SignCard';

const HomePage = () => {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    fetchSigns();
  }, []);

  const fetchSigns = async () => {
    try {
      setLoading(true);
      const data = await getSigns();
      setSigns(data);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil data. Pastikan backend sedang berjalan.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredSigns = () => {
    if (activeTab === 'all') return signs;
    return signs.filter(sign => sign.type === activeTab);
  };

  const alphabetCount = signs.filter(s => s.type === 'alphabet').length;
  const numberCount = signs.filter(s => s.type === 'number').length;
  const wordCount = signs.filter(s => s.type === 'word').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#c98f63] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#a0a0b0]">menyiapkan materi untukmu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
        <div className="text-center max-w-md px-6">
          <p className="text-[#a0a0b0] mb-4">{error}</p>
          <button 
            onClick={fetchSigns}
            className="px-6 py-2 bg-[#c98f63] text-white rounded-full hover:bg-[#b87d52] transition-colors"
          >
            coba lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] min-h-screen text-[#e0e0e0]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2a2a3e] via-[#1a1a2e] to-[#0f0f1a]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c98f63]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c98f63]/5 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Kiri - Teks */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#2a2a3e] px-4 py-2 rounded-full mb-6">
                <span className="text-[#c98f63] text-sm font-medium">belajar jadi mudah</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Belajar Bahasa
                <span className="text-[#c98f63] block">Isyarat</span>
              </h1>
              <p className="text-lg text-[#a0a0b0] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Setiap huruf punya cerita, setiap gerakan punya makna. 
            Yuk kenali bahasa isyarat dari huruf A sampai Z.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('materi')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-[#c98f63] text-white rounded-full hover:bg-[#b87d52] transition-all transform hover:scale-105 shadow-md"
                >
                  mulai belajar
                </button>
                <button 
                  onClick={() => setShowAbout(true)}
                  className="px-8 py-3 border-2 border-[#c98f63] text-[#c98f63] rounded-full hover:bg-[#c98f63] hover:text-white transition-all"
                >
                  tentang isyarat
                </button>
              </div>
            </div>

            {/* Kanan - Statistik */}
            <div className="flex-1">
              <div className="bg-[#2a2a3e]/60 backdrop-blur-sm rounded-3xl p-6 border border-[#3a3a4e]">
                <p className="text-[#a0a0b0] text-center mb-4">yang sudah kamu pelajari</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-[#1a1a2e] rounded-2xl p-4">
                    <div className="text-3xl font-bold text-[#c98f63]">{alphabetCount}</div>
                    <div className="text-xs text-[#a0a0b0] mt-1">huruf</div>
                  </div>
                  <div className="bg-[#1a1a2e] rounded-2xl p-4">
                    <div className="text-3xl font-bold text-[#c98f63]">{numberCount}</div>
                    <div className="text-xs text-[#a0a0b0] mt-1">angka</div>
                  </div>
                  <div className="bg-[#1a1a2e] rounded-2xl p-4">
                    <div className="text-3xl font-bold text-[#c98f63]">{wordCount}</div>
                    <div className="text-xs text-[#a0a0b0] mt-1">kata</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-[#c98f63]">terus semangat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-0 bg-[#1a1a2e]/95 backdrop-blur-sm z-10 border-b border-[#2a2a3e]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {[
              { id: 'all', label: 'semua', count: signs.length },
              { id: 'alphabet', label: 'huruf', count: alphabetCount },
              { id: 'number', label: 'angka', count: numberCount },
              { id: 'word', label: 'kata', count: wordCount }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#c98f63] text-white'
                    : 'text-[#a0a0b0] hover:bg-[#2a2a3e]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-[#2a2a3e]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="materi" className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <p className="text-[#a0a0b0] text-sm uppercase tracking-wider mb-2">koleksi kami</p>
          <h2 className="text-3xl font-semibold text-white">
            {filteredSigns().length} materi siap dipelajari
          </h2>
          <div className="w-20 h-1 bg-[#c98f63] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredSigns().map((sign) => (
            <SignCard key={sign._id} sign={sign} />
          ))}
        </div>

        {filteredSigns().length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#a0a0b0] text-lg mb-4">
              belum ada materi untuk kategori ini
            </p>
            <button 
              onClick={() => setActiveTab('all')}
              className="text-[#c98f63] hover:text-[#b87d52] underline"
            >
              lihat semua materi
            </button>
          </div>
        )}

        {/* Motivasi di bawah */}
        {filteredSigns().length > 0 && (
          <div className="mt-12 text-center py-6 bg-[#2a2a3e] rounded-2xl">
            <p className="text-[#a0a0b0]">
              {filteredSigns().length} materi sudah kamu lihat,
              <span className="text-[#c98f63] font-semibold"> praktikkan setiap hari, lama-lama jadi biasa</span>
            </p>
          </div>
        )}
      </main>

      {/* Modal Tentang Isyarat */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAbout(false)}>
          <div className="bg-[#1a1a2e] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#2a2a3e]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">tentang bahasa isyarat</h2>
                <button 
                  onClick={() => setShowAbout(false)}
                  className="w-8 h-8 rounded-full bg-[#2a2a3e] hover:bg-[#3a3a4e] flex items-center justify-center text-[#a0a0b0]"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-5 text-[#a0a0b0] leading-relaxed">
                <p>
                  <span className="font-semibold text-white">Bahasa isyarat</span> adalah bahasa yang menggunakan gerakan tangan, ekspresi wajah, 
                  dan bahasa tubuh untuk berkomunikasi. Digunakan oleh komunitas tuli di seluruh dunia.
                </p>
                
                <div className="bg-[#2a2a3e] rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">fakta menarik</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Setiap negara memiliki bahasa isyarat yang berbeda (ASL, BISINDO, SIBI, dll)</li>
                    <li>Bahasa isyarat bukan hanya gerakan tangan, tapi juga ekspresi wajah</li>
                    <li>Diperkirakan ada lebih dari 300 bahasa isyarat di dunia</li>
                    <li>Bahasa isyarat adalah bahasa alami, bukan buatan</li>
                  </ul>
                </div>
                
                <div className="bg-[#2a2a3e] rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">di Indonesia</h3>
                  <p className="text-sm">
                    Indonesia memiliki dua sistem bahasa isyarat: <span className="font-medium text-white">SIBI</span> (Sistem Isyarat Bahasa Indonesia) 
                    yang berdasarkan bahasa Indonesia lisan, dan <span className="font-medium text-white">BISINDO</span> (Bahasa Isyarat Indonesia) 
                    yang berkembang secara alami di komunitas tuli.
                  </p>
                </div>
                
                <div className="bg-[#2a2a3e] rounded-xl p-4">
                  <h3 className="font-semibold text-white mb-2">tips belajar</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Pelajari sedikit demi sedikit, konsisten setiap hari</li>
                    <li>Praktekkan sambil melihat cermin</li>
                    <li>Jangan takut salah, yang penting mau mencoba</li>
                    <li>Coba komunikasi sederhana dengan teman</li>
                  </ul>
                </div>
                
                <p className="text-center text-sm text-[#c98f63] pt-4">
                  "Bahasa isyarat adalah jembatan menuju inklusi"
                </p>
              </div>
              
              <button 
                onClick={() => setShowAbout(false)}
                className="mt-6 w-full py-3 bg-[#c98f63] text-white rounded-full hover:bg-[#b87d52] transition-colors"
              >
                tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#2a2a3e] py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#a0a0b0] text-sm">
            dibuat untuk teman tuli
          </p>
          <p className="text-[#6a6a7e] text-xs mt-2">
            belajar sedikit demi sedikit, setiap hari
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;