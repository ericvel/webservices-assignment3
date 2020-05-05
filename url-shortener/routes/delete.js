const express = require('express');
const router = express.Router();
const verification = require('../jwt_ver');

const Url = require('../models/url');

// DELETE Specific Url
router.delete('/:id', async (req, res) => 
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
    try
    {
      const url = await Url.findOne({ urlCode: req.params.id });

      if (url) 
      {
        url.remove();
        return res.status(204).send('Url Removed');
      } //if
      else 
      {
        return res.status(404).send('No url found');
      }//else
    }//try
    catch (err) 
    {
      console.error(err);
      res.status(500).send('Server error');
    }//catch
  }//if
  else
  {
    res.status(403).send('Forbidden');
  }//else
});//DELETE request specific Url


//----------------------------------------------------------------------------------------------------------------
//DELETE collection
router.delete('/', async (req, res) => 
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
  try
  {
    await Url.collection.drop();
    return res.status(204).send('Collection cleared');
  }//try 
  catch (err) 
  {
    console.error(err);
    res.status(500).send('Server error');
  }//catch
  }//if
  else
  {
    res.status(403).send('Forbidden');
  }//else
});//DELETE request whole collection

module.exports = router;
