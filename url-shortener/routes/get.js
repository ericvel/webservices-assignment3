const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const verification = require('../jwt_ver');

//Request Sepcific Original Url
router.get('/:id', async (req, res) =>
{
  try
  {
    const url = await Url.findOne({ urlCode: req.params.id });
    if (url) 
    {
      console.log('Long URL: ' + url.longUrl);
      return res.status(301).json(url.longUrl);
    }//if
    else 
    {
      return res.status(404).json('No url found');
    }//else
  }//try
  catch (err) 
  {
    console.error(err);
    res.status(500).json('Server error');
  }//catch
});//GET request Original Url

//Request all URL ids  
router.get('/', async (req, res) =>
{  
  const header_value = req.header('X-Access-Token');
  let isHeaderValid = false;
  try {
    isHeaderValid = await verification.Verification(header_value);
  }
  catch(err) {
    console.log('Couldn\'t verify JWT\n' + err);
  }
  
  if (isHeaderValid == true) {
    try
    {
      const url = await Url.find();
      let idList = [];
      url.forEach((item) => {
        idList.push(item.urlCode);
      });
      return res.status(200).json(idList);
    }//try
    catch (err) 
    {
      console.error(err);
      res.status(500).json('Server error');
    }//catch
  }
  else {
    res.status(403).json('Forbidden');
  }
  
});//GET request All Urls

module.exports = router;
