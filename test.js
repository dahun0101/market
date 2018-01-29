var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var cron = require('node-cron');
const Poloniex = require('poloniex-api-node');

//current time
var timestamp = Math.floor(Date.now()/1000);

/*mongodb를 nodejs와 연동한다.*/
// connect to MongoDB / the name of DB is set to 'coinsdaq'
mongoose.connect('mongodb://coinsdaq:coinsdaq@coinsdaq-shard-00-00-kon04.mongodb.net:27017/coinsdaq?ssl=true&authSource=admin');
//mongoose.connect('mongodb://localhost:27017/coinsdaq');

var db = mongoose.connection;

// we get notified if error occurs
db.on('error', console.error.bind(console, 'DB connection error:'));

// executed when the connection opens
db.once('open', function callback () {
    // add your code here when opening
      console.log("DB connection open");
});


var ticker_schema = new mongoose.Schema({
	"Sname": String,
	"date":Date,
	"currencyPair": String,
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

let poloniex = new Poloniex();


var USDT_BTC = mongoose.model('USDT_BTC', ticker_schema, 'USDT_BTC');
var usdt_str = mongoose.model('usdt_str', ticker_schema, 'usdt_str');
var usdt_eth = mongoose.model('usdt_eth', ticker_schema, 'usdt_eth');
var usdt_xrp = mongoose.model('usdt_xrp', ticker_schema, 'usdt_xrp');
var usdt_bch = mongoose.model('usdt_bch', ticker_schema, 'usdt_bch');
var usdt_nxt = mongoose.model('usdt_nxt', ticker_schema, 'usdt_nxt');
var usdt_ltc = mongoose.model('usdt_ltc', ticker_schema, 'usdt_ltc');
var usdt_etc = mongoose.model('usdt_etc', ticker_schema, 'usdt_etc');
var usdt_zec = mongoose.model('usdt_zec', ticker_schema, 'usdt_zec');
var usdt_xmr = mongoose.model('usdt_xmr', ticker_schema, 'usdt_xmr');
var usdt_rep = mongoose.model('usdt_rep', ticker_schema, 'usdt_rep');
var usdt_dash = mongoose.model('usdt_dash', ticker_schema, 'usdt_dash');


poloniex.subscribe('ticker');
poloniex.on('message', (channelName, data, seq) => {
 	if (channelName === 'ticker' && data.currencyPair === 'USDT_BTC')
 	{
 		db.collection("USDT_BTC").save({Sname:'pol', date:timestamp, data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_STR')
	{
		db.collection("USDT_STR").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_ETH')
	{
		db.collection("USDT_ETH").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_XRP')
	{
		db.collection("USDT_XRP").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_BCH')
	{
		db.collection("USDT_BCH").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_NXT')
	{
		db.collection("USDT_NXT").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_LTC')
	{
		db.collection("USDT_LTC").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_ETC')
	{
		db.collection("USDT_ETC").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_ZEC')
	{
		db.collection("USDT_ZEC").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_XMR')
	{
		db.collection("USDT_XMR").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_REP')
	{
		db.collection("USDT_REP").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}
	else if(channelName === 'ticker' && data.currencyPair === 'USDT_DASH')
	{
		db.collection("USDT_DASH").save({Sname:'pol',date:timestamp,data},function(err,res){
 			if(err) throw err;
 		});
	}

	//console.log(`Ticker: ${JSON.stringify(data)}`);
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