const express = require('express');
const cors = require('cors');
const router = express.Router();
const OpenAi = require('openai'); // Byt till require
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Ansluten till MongoDB');
  })
  .catch(err => {
    console.error('MongoDB-anslutning misslyckades:', err);
  });

// const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

const aiRoutes = require('./routes/ai');
app.use('/api/story', aiRoutes);

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});