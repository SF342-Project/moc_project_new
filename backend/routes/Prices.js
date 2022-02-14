const express = require('express')
const Price = require('../models/Prices')
const router = express.Router()
const fetch = require('node-fetch');

function dateFormat(dt){
    const d = new Date(dt)
    const year = d.getFullYear();
    const month = d.getMonth()+1;
    const date = d.getDate();
    return year + '-' + month + '-' + date
}

function subDays(date, days){
    const result = new Date();
    result.setDate(date.getDate() - days);
    return result
}

function getProductPrices(product_id,from_date,to_date){
    const fetchData = fetch('https://dataapi.moc.go.th/gis-product-prices?product_id='+product_id+'&from_date='+from_date+'&to_date='+to_date)
    .then(_res => _res.json())
    .then((text) =>{
        return text.price_list
    } );
    return fetchData
}
// https://stackoverflow.com/questions/12467102/how-to-get-the-latest-and-oldest-record-in-mongoose-js-or-just-the-timespan-bet/54741405
router.get('/now/:id',async (req,res) =>{
    var filtered = await Price.find({'id':req.params.id,})
    var now = new Date()
    var now_formatted = dateFormat(now)
    var before = subDays(now,1)
    var before_formatted = dateFormat(before)
    // console.log(filtered.length === 0);
    // var now0 = new Date(now.setHours(24,0,0,0));
    // console.log(now0);
    var product_detail = await getProductPrices(req.params.id,before_formatted,now_formatted)
    for(var i = 0; i< product_detail.length; i++){
        // console.log(product_detail[i]);
        var prodt = product_detail[i]
        // var _date = dateFormat(prodt.date);
        var _date = prodt.date
        var price_min = prodt.price_min;
        var price_max = prodt.price_max;
        console.log(_date,price_min,price_max);

    }
    
})

module.exports = router