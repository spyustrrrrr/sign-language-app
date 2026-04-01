// frontend/src/components/SignCard.jsx
import React, { useState } from 'react';

const SignCard = ({ sign }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/400x400?text=${sign.character}`;
  };

  return (
    <>
      <div 
        className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-[#f0e5da]"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Media Container */}
        <div className="aspect-square bg-gradient-to-br from-[#fdf9f4] to-[#f5ede3] flex items-center justify-center p-6 relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#e0a87c] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {sign.mediaType === 'image' ? (
            <img 
              src={sign.mediaUrl} 
              alt={`huruf ${sign.character}`}
              className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
          ) : (
            <video 
              src={sign.mediaUrl}
              className="max-h-full max-w-full"
              controls
            />
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-[#e0a87c]/0 group-hover:bg-[#e0a87c]/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#e0a87c] text-sm font-medium bg-white/80 px-3 py-1 rounded-full">
              lihat detail →
            </span>
          </div>
        </div>
        
        {/* Info */}
        <div className="p-4 text-center border-t border-[#f0e5da] bg-white">
          <h3 className="text-2xl font-bold text-[#4a3724] mb-1">
            {sign.character}
          </h3>
          <p className="text-[#b8946e] text-xs uppercase tracking-wider">
            {sign.type === 'alphabet' && 'huruf'}
            {sign.type === 'number' && 'angka'}
            {sign.type === 'word' && 'kata'}
          </p>
        </div>
      </div>

      {/* Modal Detail - Lebih Personal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {/* Hero Image */}
              <div className="bg-gradient-to-br from-[#fdf9f4] to-[#f5ede3] p-8 rounded-t-3xl">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#8b7355] hover:text-[#4a3724] transition-colors z-10"
                >
                  ✕
                </button>
                <div className="flex justify-center">
                  <img 
                    src={sign.mediaUrl} 
                    alt={`huruf ${sign.character}`}
                    className="max-h-64 object-contain"
                    onError={handleImageError}
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-1 bg-[#e0a87c]/10 rounded-full mb-3">
                    <span className="text-[#e0a87c] text-sm">
                      {sign.type === 'alphabet' && 'huruf alfabet'}
                      {sign.type === 'number' && 'angka'}
                      {sign.type === 'word' && 'kata dasar'}
                    </span>
                  </div>
                  <h2 className="text-5xl font-bold text-[#4a3724] mb-2">
                    {sign.character}
                  </h2>
                </div>
                
                <div className="space-y-5">
                  <div className="bg-[#faf7f2] rounded-xl p-5">
                    <h3 className="font-semibold text-[#4a3724] mb-2 flex items-center gap-2">
                      <span>🤟</span> cara membentuk
                    </h3>
                    <p className="text-[#8b7355] leading-relaxed">
                      {sign.description || 'deskripsi sedang disiapkan'}
                    </p>
                  </div>
                  
                  {sign.example && (
                    <div className="bg-[#faf7f2] rounded-xl p-5">
                      <h3 className="font-semibold text-[#4a3724] mb-2 flex items-center gap-2">
                        <span>💬</span> contoh penggunaan
                      </h3>
                      <p className="text-[#8b7355] leading-relaxed">
                        {sign.example}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t border-[#f0e5da] text-center">
                  <p className="text-[#b8946e] text-xs">
                    praktikkan setiap hari, lama-lama jadi biasa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignCard;