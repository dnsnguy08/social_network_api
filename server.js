const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://dennis:4pbPg9c0BgOGwtz6@cluster0.hc8bssf.mongodb.net/socialNetworkApp?retryWrites=true&w=majority')
.then(() => {
  console.log('success!'); 
})
.catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.listen(PORT, () => console.log('server started successfully!'));