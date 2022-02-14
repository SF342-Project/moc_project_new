const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const mongo_url = 'mongodb+srv://team_user:20012544@mocproject.jdugn.mongodb.net/moc_project?retryWrites=true'
const port = 4000


mongoose.connect(mongo_url,{
    useNewUrlParser: true,
})

const db = mongoose.connection;
db.once('open',()=>{
    console.log('Connected to MongoDB....');
})

app.use(bodyParser.json());


const ProductRoute = require('./routes/Products')
const PriceRoute = require('./routes/Prices')
app.use('/products',ProductRoute)
app.use('/price',PriceRoute)
app.listen(port,console.log("Listening on port: 127.0.0.1:",port))
