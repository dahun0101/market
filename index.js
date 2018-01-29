var mongoose = require('mongoose');// get mongoose package
var request = require('request');
var cheerio = require('cheerio');  
var cron = require('node-cron');


/*mongodb를 nodejs와 연동한다.*/
// connect to MongoDB / the name of DB is set to 'myDB'
mongoose.connect('mongodb://localhost:27017/coinsdaq');
var db = mongoose.connection;

// we get notified if error occurs
db.on('error', console.error.bind(console, 'connection error:'));

// executed when the connection opens
db.once('open', function callback () {
    // add your code here when opening
      console.log("connection open");
});

// creates DB schema
var userSchema = mongoose.Schema({
    date: 'string',
    high: 'string',
    low: 'string',
    open: 'string',
    close: 'string',
    volume: 'string',
    quoteVolume: 'string',
    weightedAverage: 'string'
});
 
// compiels our schema into a model
var User = mongoose.model('User', userSchema);

/*주기마다 api를 가져와서 json형식으로 저장한다.*/
cron.schedule('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', function()
{
  console.log('5분마다 실행되는 작업');
  var timestamp = Math.floor(Date.now()/1000)-300;
  var url = "https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start="+timestamp+"&end=9999999999&period=300"; 

  request(url, function(error, response, html)
  { 
   	 if (error) {throw error};
  
  	 var obj = JSON.parse(html);//convert string to JSON
  	 console.log(obj);
     
     var result = obj[0];
     
     var user1 = new User(result);
     user1.save(function (err, user1)
     {
  	 	if (err){console.log("error");} // TODO handle the error
	   });
  });
});








