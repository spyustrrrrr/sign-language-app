// backend/config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Konfigurasi storage untuk multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sign-language', // folder di cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov'],
    resource_type: 'auto' // auto detect image/video
  }
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };