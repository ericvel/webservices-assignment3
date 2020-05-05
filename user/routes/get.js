const express = require('express');
const router = express.Router();
global.ver = require('../config');

// Request JWT
router.get('/token', async (req, res) =>
{
    try
    {
      if (ver.token != '') 
      {
        // Adds token as header
        res.setHeader('X-Access-Token', ver.token);
        return res.status(200).send('Token found');
      }
      else 
      {
        return res.status(404).send('No token found');
      }
    }
    catch (err) 
    {
      console.error(err);
      res.status(500).json('Server error');
    }
});


module.exports = router;
