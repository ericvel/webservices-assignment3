const express = require('express');

const app = express();

app.use(express.json());

// Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
    next();
});

// Define Services as routes
app.use('/user', require('./routes/post'));
app.use('/user', require('./routes/get'));
const PORT = 2000;

app.listen(PORT, () => console.log('User service running on port ' + PORT));
