var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var cron = require('node-cron');

//DB연동
mongoose.connect('mongodb://localhost:27017/market');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});

var marketSchema = new mongoose.Schema({
	"name": String,
	"date": Number,
	"high": Number,
	"low": Number,
	"open": Number,
	"close": Number,
	"volume": Number,
	"quoteVolume":Number,
	"weightedAverage":Number
});

var Market = mongoose.model('BTC_XMR', marketSchema);

cron.schedule('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', function(){
	//유닉스타임 5분전 시간
	var timestamp = Math.floor(Date.now()/1000)-300;
	//api주소
	var url = "https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start="+timestamp+"&end=9999999999&period=300";

	request(url, function (err, res, html) {
		if (err) {
			throw err;
		}

		var obj = JSON.parse(html);
		var result = obj[0];

		var insert = new Market(result);

		insert.save(function(err, insert){
			if(err) return console.error(err);
		});
	});
});

