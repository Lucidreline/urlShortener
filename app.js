const express = require('express')
const connectDB = require('./config/db');

const app = express()

connectDB()
app.use(express.json({extented: false}));

const PORT = 8000 || process.env.PORT
app.listen(PORT, ()=> console.log(`Server live on port ${PORT}`))