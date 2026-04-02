const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
require ('dotenv').config();
const signRoutes = require('./routes/signRoutes');

const app = express();

//Middlware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/signs', signRoutes);

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sign-language')
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

//Routes (nani kita buat)
app.get('/', (req, res) => {
    res.json({ message: 'API is running'});
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})





