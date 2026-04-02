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

// Deskripsi untuk Huruf A-Z
const alphabetDescriptions = {
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

// Deskripsi untuk Angka 1-10
const numberDescriptions = {
  '1': 'Telunjuk lurus ke atas, jari-jari lainnya mengepal.',
  '2': 'Telunjuk dan jari tengah lurus ke atas membentuk V, jari lainnya mengepal.',
  '3': 'Telunjuk, jari tengah, jari manis lurus ke atas, ibu jari dan kelingking mengepal.',
  '4': 'Keempat jari lurus ke atas, ibu jari menekuk ke dalam telapak.',
  '5': 'Kelima jari terbuka lebar, telapak tangan menghadap ke depan.',
  '6': 'Ibu jari dan kelingking lurus ke samping, jari lainnya mengepal.',
  '7': 'Ibu jari, telunjuk, jari tengah lurus ke samping, jari lainnya mengepal.',
  '8': 'Ibu jari dan telunjuk lurus ke samping membentuk L, jari lainnya mengepal.',
  '9': 'Telunjuk membengkok seperti kait, jari lainnya mengepal.',
  '10': 'Ibu jari dan telunjuk membentuk X, jari lainnya mengepal.'
};

// Deskripsi untuk Kata Dasar
const wordDescriptions = {
  'aku': 'Telunjuk menunjuk ke arah dada sendiri.',
  'kamu': 'Telunjuk menunjuk ke arah lawan bicara.',
  'mereka': 'Gerakan melingkar dengan telunjuk.',
  'makan': 'Jari-jari seperti memegang makanan, gerakan ke mulut.',
  'minum': 'Ibu jari seperti memegang gelas, gerakan ke mulut.',
  'suka': 'Tangan membentuk hati atau ibu jari di dada.',
  'tidak': 'Gerakan tangan menolak ke samping.',
  'mau': 'Tangan terbuka, gerakan menarik ke arah dada.',
  'maaf': 'Gerakan tangan melingkar di dada.',
  'terima kasih': 'Gerakan tangan dari dagu ke depan.',
  'tolong': 'Tangan mengepal dan membuka berulang.',
  'sayang': 'Gerakan tangan menyilang di dada.',
  'iya': 'Anggukan kepala + isyarat jempol.',
  'pergi': 'Gerakan tangan menjauh dari badan.',
  'bisa': 'Kedua tangan mengepal dan membuka.'
};

async function uploadImages() {
  console.log('📤 Mulai upload gambar ke Cloudinary...\n');
  
  const uploadedData = {};
  
  // 1. Upload Huruf A-Z
  console.log('📝 Uploading alphabets A-Z...');
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for (const letter of letters) {
    const upperLetter = letter.toUpperCase();
    const fileName = `${letter}.jpg`;
    const filePath = path.join(imagesFolder, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'sign-language/alphabets',
          public_id: `huruf_${upperLetter}`
        });
        console.log(`  ✅ ${upperLetter}: ${result.secure_url}`);
        uploadedData[upperLetter] = {
          type: 'alphabet',
          url: result.secure_url,
          description: alphabetDescriptions[upperLetter]
        };
      } catch (error) {
        console.error(`  ❌ Error upload ${upperLetter}:`, error.message);
      }
    } else {
      console.log(`  ⚠️ ${fileName} not found`);
    }
  }
  
  // 2. Upload Angka 1-10
  console.log('\n🔢 Uploading numbers 1-10...');
  for (let i = 1; i <= 10; i++) {
    const fileName = `${i}.jpg`;
    const filePath = path.join(imagesFolder, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'sign-language/numbers',
          public_id: `angka_${i}`
        });
        console.log(`  ✅ ${i}: ${result.secure_url}`);
        uploadedData[i.toString()] = {
          type: 'number',
          url: result.secure_url,
          description: numberDescriptions[i.toString()]
        };
      } catch (error) {
        console.error(`  ❌ Error upload ${i}:`, error.message);
      }
    } else {
      console.log(`  ⚠️ ${fileName} not found`);
    }
  }
  
  // 3. Upload Kata Dasar
  console.log('\n💬 Uploading words...');
  const words = ['aku', 'kamu', 'mereka', 'makan', 'minum', 'suka', 'tidak', 'mau', 'maaf', 'terima kasih', 'tolong', 'sayang', 'iya', 'pergi', 'bisa'];
  
  for (const word of words) {
    const fileName = `${word}.jpg`;
    const filePath = path.join(imagesFolder, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'sign-language/words',
          public_id: `kata_${word.replace(/ /g, '_')}`
        });
        console.log(`  ✅ ${word}: ${result.secure_url}`);
        uploadedData[word] = {
          type: 'word',
          url: result.secure_url,
          description: wordDescriptions[word] || 'Belum ada deskripsi'
        };
      } catch (error) {
        console.error(`  ❌ Error upload ${word}:`, error.message);
      }
    } else {
      console.log(`  ⚠️ ${fileName} not found`);
    }
  }
  
  console.log('\n📋 Data yang sudah diupload:');
  console.log(`  - Alphabets: ${Object.keys(uploadedData).filter(k => uploadedData[k].type === 'alphabet').length}/26`);
  console.log(`  - Numbers: ${Object.keys(uploadedData).filter(k => uploadedData[k].type === 'number').length}/10`);
  console.log(`  - Words: ${Object.keys(uploadedData).filter(k => uploadedData[k].type === 'word').length}/15`);
  
  // Simpan ke file
  fs.writeFileSync('uploaded-data.json', JSON.stringify(uploadedData, null, 2));
  console.log('\n✅ Data sudah disimpan di uploaded-data.json');
}

uploadImages();

