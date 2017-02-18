
module.export = function(app){

    app.get('/:time',function(req, res){
        var tmp = req.params.time;
        var ms=decodeURI(tmp);
        var unixTime={unix:'', natural:''};
        var date;
        if(isNaN(parseInt(ms))){
            date = new Date(ms);
            unixTime.unix=(Math.round(date.getTime()/1000.0));
            unixTime.natural=ms;
          
        }else{
          
            date = new Date(parseInt(ms)*1000);
            unixTime.unix=ms;
            unixTime.natural=naturalDate(date);
            
        }
       res.send(unixTime);
    })
    
    function naturalDate(d){
        var months = ["January","February","March","April","May","June","July","August","September","October"
        ,"November","December"];
        return months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear();
    }

}