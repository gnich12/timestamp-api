var express = require('express')
var app = express()
var path=require('path');
var bodyparser=require('body-parser');
var port = process.env.PORT || 3000 || 8080;
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:time',function(req, res){
    var timeQuery = req.params.time;
    var unixTime={unix:'', natural:''};
    var date = new Date(timeQuery);
    

    if(!isNaN(parseInt(timeQuery))){
        date = new Date(parseInt(timeQuery)*1000);
        unixTime.unix=(Math.round(date.getTime()/1000.0));
        unixTime.natural=naturalDate(date);
      
    }else{
      
        date = new Date(timeQuery);
        if(!isNaN(date.getDate())){
            unixTime.unix=date.getTime()/1000;
            unixTime.natural=naturalDate(date);    
        }else{
            unixTime.unix=null;
            unixTime.natural=null;
        }
        
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