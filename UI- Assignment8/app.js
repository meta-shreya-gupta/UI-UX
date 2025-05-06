const express = require('express');

const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'packages')));

app.get('/',(req,res) => {
    res.redirect('index.html');
});

app.listen(port, () => {console.log(`server started on ${port}`)});