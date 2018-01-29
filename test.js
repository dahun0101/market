var mongoose = require('mongoose');
var request = require('request');
var cron = require('node-cron');
const Poloniex = require('poloniex-api-node');
let poloniex = new Poloniex();

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});

var tradeSite = new mongoose.Schema({
	"Sname" : {type : String, unique : true}
});

var sitename = mongoose.model('sitename', tradeSite, 'sitename');

var market = new mongoose.Schema({
	// "Sname" : {type : String, ref : 'sitename'},
	// "Mname" : {type : String, unique : true}
	"Sname" : String,
	"Mname" : String
});

var marketname = mongoose.model('marketname', market, 'marketname');

var poloniexData = new mongoose.Schema({
	"Sname" : {type : String, ref : 'sitename'},
	"Mname" : {type : String, ref : 'marketname'},
	"date" : Date,
	"last" : Number,
	"lowestAsk" : Number,
	"highestBid" : Number,
	"percentChange" : Number,
	"baseVolume" : Number,
	"quoteVolume" : Number,
	"isFrozen" : Number,
	"24hrHigh" : Number,
	"24hrLow" : Number
});





// Poloniex

var PoloniexSite = new sitename({Sname : 'Poloniex'});

PoloniexSite.save(function (err){
	if(err) return handleError(err);
})



// var PoloniexMarket = new marketname();

var arr = [{Sname : 'Poloniex', Mname : 'usdt_btc'}, {Sname : 'Poloniex', Mname : 'usdt_str'}];


// PoloniexMarket.save(function (err){
// 	//if(err) return handleError(err);
// })

PoloniexMarket.insertMany(arr, function(error, docs){
	if(error) return handleError(error);
})
poloniex.subscribe('ticker');

poloniex.on('message', (channelName, data, seq) => {
  if (channelName === 'ticker') {
    console.log(`Ticker: ${JSON.stringify(data)}`);

	if (data.currencyPair === 'usdt_btc'){

	}    

  }


});

poloniex.on('open', () => {
  console.log(`Poloniex WebSocket connection open`);
});

poloniex.on('close', (reason, details) => {
  console.log(`Poloniex WebSocket connection disconnected`);
});

poloniex.on('error', (error) => {
  console.log(`An error has occured`);
});

poloniex.openWebSocket({ version: 2 });

