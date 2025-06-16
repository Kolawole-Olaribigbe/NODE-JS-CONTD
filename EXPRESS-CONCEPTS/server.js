require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {configureCors} = require('./config/corsConfig');

const app = express();
const PORT = process.env.PORT || 3000

//express middleware
app.use(configureCors());
app.use(express.json());

app.listen(PORT, ()=> {
    console.log(`Server is now running on port ${PORT}`);
});