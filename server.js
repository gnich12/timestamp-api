var express = require('express')
var app = express()
var path=require('path');
var bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));

app.get('/', function (req, res) {
  var stamp={unix:null, natural:null};
  res.end(JSON.stringify(stamp));
})

app.get('/:time',function(req, res){
    var tmp = req.params.time;
    var ms=decodeURI(tmp);
    var unixTime={unix:'', natural:''};
    var date;
    if(isNaN(parseInt(ms))){
        date = new Date(ms);
        unixTime.unix=(Math.round(date.getTime()/1000.0));
        unixTime.natural=ms;
        console.log(ms+ " normal date");
    }else{
        console.log(ms+ " number");
        date = new Date(parseInt(ms)*1000);
        unixTime.unix=ms;
        unixTime.natural=naturalDate(date);
        
    }
    
   res.send(unixTime);
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

function naturalDate(d){
    var months = ["January","February","March","April","May","June","July","August","September","October"
    ,"November","December"];
    return months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();
}