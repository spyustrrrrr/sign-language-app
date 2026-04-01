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
    
    for (const [letter, info] of Object.entries(data)) {
      const result = await Sign.findOneAndUpdate(
        { character: letter, type: 'alphabet' },
        { 
          mediaUrl: info.url,
          mediaType: 'image',
          description: info.description,
          example: `Contoh penggunaan: ${letter} seperti pada kata "${letter}"`
        },
        { new: true, upsert: true }
      );
      console.log(`✅ Updated ${letter}: ${result.character}`);
    }
    
    console.log('\n✅ All data updated to database!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateDatabase();
