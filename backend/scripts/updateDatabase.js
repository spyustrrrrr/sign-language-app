const mongoose = require('mongoose');
const Sign = require('../models/Sign');
const fs = require('fs');
require('dotenv').config();

// Baca data hasil upload
const data = JSON.parse(fs.readFileSync('uploaded-data.json', 'utf8'));

async function updateDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    let count = 0;
    
    for (const [character, info] of Object.entries(data)) {
      const result = await Sign.findOneAndUpdate(
        { character: character, type: info.type },
        { 
          character: character,
          type: info.type,
          mediaType: 'image',
          mediaUrl: info.url,
          description: info.description,
          example: `Contoh: ${character}`
        },
        { new: true, upsert: true }
      );
      console.log(`✅ ${result.type.toUpperCase()}: ${result.character}`);
      count++;
    }
    
    console.log(`\n✅ ${count} data berhasil diupdate ke database!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateDatabase();
