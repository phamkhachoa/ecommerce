const express = require('express')
const app = express();
require('dotenv').config()

app.get('/', (req, res) => {
    res.send("hello from node update");
});

const port = process.env.port || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})