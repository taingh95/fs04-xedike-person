//express
const express = require('express');
const mongoose = require('mongoose');



const app = express()
//my packages


//connect moongse db
mongoose.connect('mongodb://localhost:27017/fs04-xedike',{useNewUrlParser: true})
    .then(() => {console.log('Connected to DB')})
    .catch(err => console.log(err))



const port = process.env.PORT ||5000; //tao bien moi truong (vi tren nhung moi truong khac nhau, dung port khac nhau)
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
})