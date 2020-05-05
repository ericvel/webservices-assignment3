const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const verification = require('../jwt_ver');

const Url = require('../models/url');

// Short Url Creation
router.post('/', async (req, res) => 
{
  const header_value = req.header('X-Access-Token');
  let isHeaderValid = false;
  try {
    isHeaderValid = await verification.Verification(header_value);
  }
  catch(err) {
    console.log('Couldn\'t verify JWT');
  }
  
  if (isHeaderValid == true)
  {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');
    // Check base url
    if (!validUrl.isUri(baseUrl))
    {
      return res.status(401).json('Invalid base url');
    }//if
    // Create url code
    const urlCode = shortid.generate();
    // Check long url
    if (validUrl.isUri(longUrl))
    {
      try
      {
        let url = await Url.findOne({ longUrl });
        if (url)
        {
            res.status(201).json(url.urlCode);
        }//if
        else
        {
          const shortUrl = baseUrl + '/' + urlCode;
          url = new Url
          ({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date()
          });

          await url.save();
          res.status(201).json(url);
        }//else
      }//try 
      catch (err)
      {
        console.error(err);
        res.status(500).json('Server error');
      }//catch
    }//if
    else
    {
      res.status(400).json('Invalid long url (remember to include http://)');
    }//else
  }//if
  else
  {
    res.status(403).json('Forbidden');
  }//else
});//POST request short Url Creation


module.exports = router;
