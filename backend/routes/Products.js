const express = require('express');
// const Product = require('../models/Product')
const router = express.Router()

var _ = require("underscore");
const mock_data = require('../mock_data/product.json')

router.get('/all',(req,res)=>{
    res.send(mock_data)
})

router.get('/id/:id',(req,res) =>{
    var filtered = _.where(mock_data,{'id':req.params.id})
    res.send(filtered)
})

router.get('/keyword/:keyword',(req,res) =>{
    var filtered = findKeyWord(req.params.keyword);
    res.send(filtered)
})

function findKeyWord(kw){
    var result = [];
    for(var i = 0; i<mock_data.length;i++){
        if(mock_data[i].name.indexOf(kw) > -1) result.push(mock_data[i]);
    }
    return result;
}

module.exports = router