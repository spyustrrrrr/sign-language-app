const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// GANTI INI dengan lokasi folder gambar kamu!
const imagesFolder = '/home/yustr/Project/sign-language-app/images/';

// Deskripsi untuk setiap huruf
const descriptions = {
  'A': 'Kepalan tangan dengan ibu jari di samping. Telapak tangan menghadap ke depan.',
  'B': 'Telapak tangan terbuka lebar, ibu jari menekuk ke dalam. Keempat jari lurus rapat.',
  'C': 'Tangan membentuk huruf C, jari-jari melengkung seperti memegang gelas.',
  'D': 'Telunjuk lurus ke atas, jari-jari lainnya mengepal, ibu jari menekuk di atas jari tengah.',
  'E': 'Jari-jari membentuk huruf E, ibu jari menekuk di depan jari lainnya.',
  'F': 'Ibu jari dan telunjuk membentuk lingkaran, jari lainnya lurus ke atas.',
  'G': 'Telunjuk lurus ke samping, ibu jari sejajar, jari lainnya mengepal.',
  'H': 'Telunjuk dan jari tengah lurus ke samping, jari lainnya mengepal.',
  'I': 'Kelingking lurus ke atas, ibu jari menekuk di atas jari manis.',
  'J': 'Kelingking lurus, gerakan membentuk huruf J dari atas ke bawah.',
  'K': 'Telunjuk dan jari tengah lurus ke atas membentuk V, ibu jari di antara.',
  'L': 'Ibu jari dan telunjuk membentuk huruf L, jari lainnya mengepal.',
  'M': 'Ibu jari di bawah jari telunjuk, tengah, dan manis yang mengepal.',
  'N': 'Ibu jari di antara jari telunjuk dan tengah, jari lainnya mengepal.',
  'O': 'Jari-jari membentuk lingkaran seperti huruf O, ibu jari dan telunjuk menyentuh.',
  'P': 'Telunjuk lurus ke bawah, ibu jari sejajar, jari lainnya mengepal.',
  'Q': 'Telunjuk dan ibu jari membentuk Q, jari lainnya mengepal.',
  'R': 'Telunjuk dan jari tengah menyilang, jari lainnya mengepal.',
  'S': 'Kepalan tangan, ibu jari di depan jari telunjuk.',
  'T': 'Ibu jari di antara telunjuk dan jari tengah, jari lainnya mengepal.',
  'U': 'Telunjuk dan jari tengah lurus ke atas, jari lainnya mengepal.',
  'V': 'Telunjuk dan jari tengah membentuk huruf V, jari lainnya mengepal.',
  'W': 'Telunjuk, jari tengah, jari manis lurus ke atas, jari lainnya mengepal.',
  'X': 'Telunjuk membengkok membentuk huruf X, ibu jari menekuk.',
  'Y': 'Ibu jari dan kelingking lurus ke samping, jari lainnya mengepal.',
  'Z': 'Telunjuk lurus, gerakan membentuk huruf Z di udara.'
};

// Huruf A-Z (lowercase untuk nama file a.jpg)
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

async function uploadImages() {
  console.log('📤 Mulai upload gambar ke Cloudinary...\n');
  
  const uploadedUrls = {};
  
  for (const letter of letters) {
    const upperLetter = letter.toUpperCase();
    const fileName = `${letter}.jpg`;
    const filePath = path.join(imagesFolder, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'sign-language/alphabets',
          public_id: `huruf_${upperLetter}`,
          // Optional: tambahkan deskripsi di metadata cloudinary
          context: `description=${descriptions[upperLetter]}`
        });
        console.log(`✅ ${upperLetter}: ${result.secure_url}`);
        uploadedUrls[upperLetter] = {
          url: result.secure_url,
          description: descriptions[upperLetter]
        };
      } catch (error) {
        console.error(`❌ Error upload ${upperLetter}:`, error.message);
      }
    } else {
      console.log(`⚠️ File tidak ditemukan: ${filePath}`);
    }
  }
  
  console.log('\n📋 Data yang sudah diupload:');
  console.log(JSON.stringify(uploadedUrls, null, 2));
  
  // Simpan ke file untuk update database
  fs.writeFileSync('uploaded-data.json', JSON.stringify(uploadedUrls, null, 2));
  console.log('\n✅ Data sudah disimpan di uploaded-data.json');
}

uploadImages();
