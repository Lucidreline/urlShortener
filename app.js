const express = require('express')
const connectDB = require('./config/db');
const bodyParser = require('body-parser') // alows us to get info from forms
const config = require('config')

const app = express()

connectDB()
app.use(express.json({ extented: false }));
app.set("view engine", "ejs"); //We have to tell the app to always render ejs files so that we dont have to keep putting .ejs after each file... Stay DRY amigos
app.use(express.static("public")); //Tells the app where we are going to put assets like photos, stylesheets, scripts, etc.
app.use(bodyParser.urlencoded({ extended: true })); //Allows us to get information from forms

// Define routes
app.use(require('./routes/index'))
app.use(require('./routes/url'))

const PORT = config.get('PORT')
app.listen(PORT, () => console.log(`Server live on port ${PORT}`))
