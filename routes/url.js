const express = require('express')
const router = express.Router();

const validUrl = require('valid-url') // makes sure url's are real
const shortId = require('shortid') // gives the ability to create a
const config = require('config')

const Url = require('../models/Url')

// @route  POST /api/url/shorten
// @desc   Create Short Url
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl')

    // check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url')
    }

    let unique = false
    let urlCode = ''
    while(!unique){ 
        // create url code
        urlCode = shortId.generate()
        foundUrl = await Url.findOne({ urlCode })

        if(!foundUrl){
            unique = true
        }
    }

    

    // check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) { // prevents 2 codes being given out for one same website
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save()

                res.json(url)

            }
        } catch (err) {
            console.err(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid Long Url')
    }
})

module.exports = router
