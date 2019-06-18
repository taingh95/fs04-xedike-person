//express
const express = require('express');
const mongoose = require('mongoose');




//my packages


//connect moongse db
mongoose.connect('mongodb://localhost:27017/fs04-xedike',{useNewUrlParser: true})
    .then(() => {console.log('Connected to DB')})
    .catch(err => console.log(err))


// middleware, co 3 thanh phan (request, res: ket thuc, next: qua mdw tiep theo)
const app = express()
//parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


app.use('/api/user', require('./router/api/users'))
app.use('/uploads', express.static('uploads'))

// app.get('/', (req, res) => {
//     res.json({message: "Hello World"})
// })
// app.get('/',(red,res,next) => {
//     console.log('MDW 1');
//     next();
// }, (red,res,next) => {
//     console.log('MDW 2');
//     next();
// }, (red,res,next) => {
//     res.send('Hello World 1');
//     res.send('Hello World 2');
// })





const port = process.env.PORT || 9999; //tao bien moi truong (vi tren nhung moi truong khac nhau, dung port khac nhau)
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
})