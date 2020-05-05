const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

// Define Routes
app.use('/', require('./routes/get'));
app.use('/', require('./routes/post'));
app.use('/', require('./routes/delete'));
app.use('/', require('./routes/put'));
const PORT = 4000;

app.listen(PORT, () => console.log('URL shortener running on port ' + PORT));