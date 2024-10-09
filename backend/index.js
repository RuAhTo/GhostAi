const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Ansluten till MongoDB');
  })
  .catch(err => {
    console.error('MongoDB-anslutning misslyckades:', err);
  });


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
