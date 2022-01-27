const express = require('express')
const app = express()
const mock_data = require('./mock_data/product.json')
var _ = require("underscore");

app.get('/products', (req, res) => {
    res.send(mock_data)
})

app.get('/product/:id',(req,res) =>{
    var filtered = _.where(mock_data,{'id':req.params.id})
    res.send(filtered)
})

function findKeyword(kw){
    var result=[];
    for(var i = 0; i<mock_data.length;i++){
        if(mock_data[i].name.indexOf(kw) > -1){
            result.push(mock_data[i])
        }
    }
    return result;
}

app.get('/product/keyword/:keyword',(req,res) =>{
    var filtered = findKeyword(req.params.keyword);
    res.send(filtered)
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})