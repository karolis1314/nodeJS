const express = require('express');
const app = express();

require('dotenv/config');

// env variable
const api = process.env.API_URL;

app.get(api + '/', (req, res) => {
    res.send(api);
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});