// backend/controllers/signController.js
const Sign = require('../models/Sign');
const { cloudinary } = require('../config/cloudinary');

// GET semua data
const getAllSigns = async (req, res) => {
  try {
    const signs = await Sign.find().sort({ character: 1 });
    res.json(signs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET berdasarkan tipe (alphabet/number/word)
const getSignsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const signs = await Sign.find({ type }).sort({ character: 1 });
    res.json(signs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST tambah data baru (dengan upload)
const createSign = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File harus diupload!' });
    }

    const newSign = new Sign({
      character: req.body.character,
      type: req.body.type,
      mediaType: req.file.mimetype.startsWith('image') ? 'image' : 'video',
      mediaUrl: req.file.path,
      mediaPublicId: req.file.filename,
      description: req.body.description,
      example: req.body.example
    });

    const savedSign = await newSign.save();
    res.status(201).json(savedSign);
  } catch (error) {
    // Kalau error, hapus file yang sudah terupload
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({ message: error.message });
  }
};

// DELETE data
const deleteSign = async (req, res) => {
  try {
    const sign = await Sign.findById(req.params.id);
    
    if (!sign) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    // Hapus dari Cloudinary
    await cloudinary.uploader.destroy(sign.mediaPublicId);
    
    // Hapus dari database
    await sign.deleteOne();
    
    res.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSigns,
  getSignsByType,
  createSign,
  deleteSign
};