const express = require('express')
const connectDB = require('./config/db');

const app = express()

connectDB()
app.use(express.json({extented: false}));

// Define routes
app.use('/api/url', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

const PORT = 8020 || process.env.PORT
app.listen(PORT, ()=> console.log(`Server live on port ${PORT}`))