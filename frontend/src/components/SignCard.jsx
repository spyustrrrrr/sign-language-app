// frontend/src/components/SignCard.jsx
import React, { useState } from 'react';

const SignCard = ({ sign }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isPlaceholder = sign.isPlaceholder || (!sign.mediaUrl && !sign.videoUrl);
  const isVideo = sign.mediaType === 'video' || sign.videoUrl;

  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/400x400?text=${sign.character}`;
  };

  return (
    <>
      {/* Card */}
      <div 
        className="group bg-[#1a1a2e] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-[#2a2a3e]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-square bg-gradient-to-br from-[#2a2a3e] to-[#1a1a2e] flex items-center justify-center p-6 relative overflow-hidden">
          {isPlaceholder ? (
            <div className="text-center">
              <div className="text-4xl mb-2">[video]</div>
              <p className="text-[#6a6a7e] text-sm">video segera hadir</p>
            </div>
          ) : isVideo ? (
            <video 
              src={sign.mediaUrl || sign.videoUrl}
              className="max-h-full max-w-full object-contain pointer-events-none"
            />
          ) : (
            <img 
              src={sign.mediaUrl} 
              alt={sign.character}
              className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
          )}
          <div className="absolute inset-0 bg-[#c98f63]/0 group-hover:bg-[#c98f63]/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#c98f63] text-sm font-medium bg-[#1a1a2e]/80 px-3 py-1 rounded-full border border-[#2a2a3e]">
              lihat detail →
            </span>
          </div>
        </div>
        
        <div className="p-4 text-center border-t border-[#2a2a3e] bg-[#1a1a2e]">
          <h3 className="text-xl font-bold text-white mb-1">
            {sign.character}
          </h3>
          <p className="text-[#6a6a7e] text-xs uppercase tracking-wider">
            {sign.type === 'alphabet' && 'huruf'}
            {sign.type === 'number' && 'angka'}
            {sign.type === 'word' && 'kata'}
            {isPlaceholder && ' • segera hadir'}
          </p>
        </div>
      </div>

      {/* Modal Pop-up - Dark Mode */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-[#1a1a2e] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#2a2a3e]" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#2a2a3e] to-[#1a1a2e] p-8 rounded-t-3xl">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#2a2a3e] hover:bg-[#3a3a4e] flex items-center justify-center text-[#a0a0b0] hover:text-white transition-colors z-10"
                >
                  ✕
                </button>
                <div className="flex justify-center">
                  {isPlaceholder ? (
                    <div className="text-center py-8">
                      <div className="text-6xl mb-4">[video]</div>
                      <p className="text-[#6a6a7e]">video demonstrasi sedang disiapkan</p>
                    </div>
                  ) : isVideo ? (
                    <video 
                      src={sign.mediaUrl || sign.videoUrl}
                      className="max-h-80 object-contain rounded-xl"
                      controls
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img 
                      src={sign.mediaUrl} 
                      alt={sign.character}
                      className="max-h-80 object-contain rounded-xl"
                      onError={handleImageError}
                    />
                  )}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-1 bg-[#2a2a3e] rounded-full mb-3">
                    <span className="text-[#c98f63] text-sm">
                      {sign.type === 'alphabet' && 'huruf alfabet'}
                      {sign.type === 'number' && 'angka'}
                      {sign.type === 'word' && 'kata dasar'}
                    </span>
                  </div>
                  <h2 className="text-5xl font-bold text-white mb-2">
                    {sign.character}
                  </h2>
                </div>
                
                <div className="bg-[#2a2a3e] rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-2">
                    cara membentuk
                  </h3>
                  <p className="text-[#a0a0b0] leading-relaxed">
                    {sign.description || 'deskripsi sedang disiapkan'}
                  </p>
                </div>
                
                {sign.example && (
                  <div className="mt-4 bg-[#2a2a3e] rounded-xl p-5">
                    <h3 className="font-semibold text-white mb-2">
                      contoh penggunaan
                    </h3>
                    <p className="text-[#a0a0b0] leading-relaxed">
                      {sign.example}
                    </p>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t border-[#2a2a3e] text-center">
                  <p className="text-[#6a6a7e] text-xs">
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