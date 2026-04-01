// backend/routes/signRoutes.js
const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const {
  getAllSigns,
  getSignsByType,
  createSign,
  deleteSign
} = require('../controllers/signController');

// Routes
router.get('/', getAllSigns);
router.get('/type/:type', getSignsByType);
router.post('/', upload.single('media'), createSign);
router.delete('/:id', deleteSign);

module.exports = router;