const express = require('express')
const router = express.Router();

const Url = require('../models/Url')

// @ route  GET /api/url
// @ desc  redirects to the desired url
router.get('/', (req, res)=> res.render('./index', {shortUrl: false}))


// @ route  GET /api/url/:code
// @ desc  redirects to the desired url
router.get('/:code', async (req, res) => {
    try{
        const url = await Url.findOne({ urlCode: req.params.code }) // finds the url in the data base

        if (url){ 
            return res.redirect(url.longUrl)
        }else{
            return res.status(401).json('No url found')
        }
    }catch(err){
        console.error(err)
        res.status(500).json('Server Error');
    }
})



module.exports = router
