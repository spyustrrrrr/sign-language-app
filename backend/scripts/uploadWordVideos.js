const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Sign = require('../models/Sign');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// GANTI PATH INI dengan folder video kamu
const videosFolder = '/home/yustr/Project/sign-language-app/words/';

// Mapping nama file ke karakter yang disimpan di database
const wordMapping = {
  'thank_you': 'terima kasih',
  'sorry': 'maaf',
  'help': 'tolong',
  'eat': 'makan',
  'drink': 'minum',
  'like': 'suka',
  'love': 'sayang',
  'yes': 'iya',
  'no': 'tidak',
  'want': 'mau',
  'go': 'pergi',
  'can': 'bisa',
  'please': 'tolong',
  'hello': 'halo',
  'goodbye': 'selamat tinggal'
};

// Deskripsi untuk setiap kata
const descriptions = {
  'terima kasih': 'Gerakan tangan dari dagu ke depan.',
  'maaf': 'Gerakan tangan melingkar di dada.',
  'tolong': 'Tangan terbuka dan mengusap dada.',
  'makan': 'Jari-jari seperti memegang makanan, gerakan ke mulut.',
  'minum': 'Ibu jari seperti memegang gelas, gerakan ke mulut.',
  'suka': 'Tangan membentuk hati atau ibu jari di dada.',
  'sayang': 'Gerakan tangan menyilang di dada.',
  'iya': 'Anggukan kepala + isyarat jempol.',
  'tidak': 'Gerakan tangan menolak ke samping.',
  'mau': 'Tangan terbuka, gerakan menarik ke arah dada.',
  'pergi': 'Gerakan tangan menjauh dari badan.',
  'bisa': 'Kedua tangan mengepal',
  'halo': 'Gerakan tangan seperti melambai atau memberi hormat.',
  'selamat tinggal': 'Gerakan tangan melambai pergi.'
};

async function uploadVideos() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');
    
    for (const [fileName, character] of Object.entries(wordMapping)) {
      // Cek file .mov atau .mp4
      let filePath = path.join(videosFolder, `${fileName}.mov`);
      if (!fs.existsSync(filePath)) {
        filePath = path.join(videosFolder, `${fileName}.mp4`);
      }
      
      if (fs.existsSync(filePath)) {
        try {
          // Upload ke Cloudinary
          const result = await cloudinary.uploader.upload(filePath, {
            folder: 'sign-language/words',
            public_id: `kata_${character.replace(/ /g, '_')}`,
            resource_type: 'video'
          });
          console.log(`✅ Uploaded ${character}: ${result.secure_url}`);
          
          // Update database
          await Sign.findOneAndUpdate(
            { character: character, type: 'word' },
            {
              character: character,
              type: 'word',
              mediaType: 'video',
              mediaUrl: result.secure_url,
              videoUrl: result.secure_url,
              description: descriptions[character] || 'Belum ada deskripsi',
              example: `Kata: ${character}`,
              isPlaceholder: false
            },
            { upsert: true }
          );
          console.log(`  📝 Database updated for ${character}\n`);
          
        } catch (error) {
          console.error(`❌ Error upload ${character}:`, error.message);
        }
      } else {
        console.log(`⚠️ Video not found: ${fileName}.mov or .mp4`);
      }
    }
    
    console.log('\n✅ Selesai! Refresh website untuk melihat video.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

uploadVideos();
