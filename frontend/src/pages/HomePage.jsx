// frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { getSigns } from '../services/api';
import SignCard from '../components/SignCard';

const HomePage = () => {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#e0a87c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8b7355]">menyiapkan materi untukmu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-[#8b7355] mb-4">{error}</p>
          <button 
            onClick={fetchSigns}
            className="px-6 py-2 bg-[#e0a87c] text-white rounded-full hover:bg-[#c98f63] transition-colors"
          >
            coba lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      {/* Hero Section - Lebih Hangat */}
      <section className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5ede3] to-[#fff9f0]"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#f0e0d0] rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e8d8c8] rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-[#e0a87c]/10 rounded-full">
            <span className="text-[#e0a87c] text-sm">🤟 ayo mulai belajar</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#4a3724] mb-6 leading-tight">
            Belajar Bahasa<br/>
            <span className="text-[#e0a87c]">Isyarat</span>
          </h1>
          <p className="text-lg md:text-xl text-[#8b7355] max-w-2xl mx-auto mb-8 leading-relaxed">
            Setiap huruf punya cerita, setiap gerakan punya makna. 
            Yuk kenali bahasa isyarat dari huruf A sampai Z.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button 
              onClick={() => document.getElementById('materi')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-[#e0a87c] text-white rounded-full hover:bg-[#c98f63] transition-all transform hover:scale-105 shadow-md"
            >
              mulai belajar
            </button>
            <button className="px-8 py-3 border-2 border-[#e0a87c] text-[#e0a87c] rounded-full hover:bg-[#e0a87c] hover:text-white transition-all">
              tentang isyarat
            </button>
          </div>
        </div>
      </section>

      {/* Filter Tabs - Lebih Natural */}
      <div className="sticky top-0 bg-[#faf7f2]/95 backdrop-blur-sm z-10 border-b border-[#e8ddd0]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {[
              { id: 'all', label: 'semua', icon: '✨' },
              { id: 'alphabet', label: 'huruf', icon: '🔤' },
              { id: 'number', label: 'angka', icon: '🔢' },
              { id: 'word', label: 'kata', icon: '💬' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#e0a87c] text-white shadow-md'
                    : 'text-[#8b7355] hover:bg-[#f0e5da]'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="materi" className="container mx-auto px-4 py-12">
        {/* Greeting - Personal Touch */}
        <div className="mb-10 text-center">
          <p className="text-[#b8946e] text-sm uppercase tracking-wider mb-2">koleksi kami</p>
          <h2 className="text-3xl font-semibold text-[#4a3724]">
            {filteredSigns().length} materi siap dipelajari
          </h2>
          <p className="text-[#8b7355] mt-2">
            {filteredSigns().length === signs.length 
              ? 'semua materi siap menemanimu belajar ✨'
              : `menampilkan ${filteredSigns().length} dari ${signs.length} materi`}
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredSigns().map((sign) => (
            <SignCard key={sign._id} sign={sign} />
          ))}
        </div>

        {/* Empty State */}
        {filteredSigns().length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤔</div>
            <p className="text-[#8b7355] text-lg mb-4">
              belum ada materi untuk kategori ini
            </p>
            <button 
              onClick={() => setActiveTab('all')}
              className="text-[#e0a87c] hover:text-[#c98f63] underline"
            >
              lihat semua materi
            </button>
          </div>
        )}
      </main>

      {/* Footer - Sederhana & Personal */}
      <footer className="border-t border-[#e8ddd0] py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#8b7355] text-sm">
            dibuat dengan 💛 untuk teman tuli
          </p>
          <p className="text-[#b8946e] text-xs mt-2">
            belajar sedikit demi sedikit, setiap hari
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;