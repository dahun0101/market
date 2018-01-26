/* NPM */
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Poloniex = require('poloniex-api-node');

/* GLOBAL VARIABLE */
var timestamp = Math.floor(Date.now()/1000); //CURRENT UNIX TIME

/* DB configuration */
var url = "mongodb://localhost:27017/";

/* MongoDB connection */
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	console.log("MongoClient : Database connected!");

	var dbo = db.db("mydb");

/* Mongoose connection */
mongoose.connect('mongodb://localhost:27017/mydb');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Mongo db connection OK.");
});

/* Config Schema */
//Data Schema
var data = new mongoose.Schema({
	"Sname" : String,
	"date" : Date,
	"last" : Number,
	"lowestAsk" : Number,
	"highestBid" : Number,
	"percentChange" : Number,
	"baseVolume" : Number,
	"quoteVolume" : Number
 	"isFrozen" : Number,
	"24hrHigh" : Number,
	"24hrLow" : Number
});

/* Collection */
var usdt_btc = mongoose.model('usdt_btc', data, 'usdt_btc');
var usdt_str = mongoose.model('usdt_str', data, 'usdt_str');
var usdt_eth = mongoose.model('usdt_eth', data, 'usdt_eth');
var usdt_xrp = mongoose.model('usdt_xrp', data, 'usdt_xrp');
var usdt_bch = mongoose.model('usdt_bch', data, 'usdt_bch');
var usdt_nxt = mongoose.model('usdt_nxt', data, 'usdt_nxt');
var usdt_ltc = mongoose.model('usdt_ltc', data, 'usdt_ltc');
var usdt_etc = mongoose.model('usdt_etc', data, 'usdt_etc');
var usdt_zec = mongoose.model('usdt_zec', data, 'usdt_zec');
var usdt_xmr = mongoose.model('usdt_xmr', data, 'usdt_xmr');
var usdt_rep = mongoose.model('usdt_rep', data, 'usdt_rep');
var usdt_dash = mongoose.model('usdt_dash', data, 'usdt_dash');

/* POLONIEX DATA INSERTION START */
let poloniex = new Poloniex();

var poloniexData = mongoose.model('poloniexData', data, 'poloniexData');

poloniex.subscribe('ticker');

poloniex.on('message', (channelName, data, seq) => {
  if (channelName === 'ticker') {
    var input = {
    	sname : 'POL', 
    	date : timestamp,
    	last : data.last,
    	lowestAsk : data.lowestAsk,
    	highestBid : data.highestBid,
    	percentChange : data.percentChange,
    	baseVolume : data.baseVolume,
    	quoteVolume : data.quoteVolume,
    	isFrozen : data.isFrozen,
    	24hrHigh : data.24hrHigh,
    	24hrLow : data.24hrLow
    	};

	if (data.currencyPair === 'USDT_BTC'){
		dbo.collection("usdt_btc").insertOne(input, function(err, res) {
			if (err) throw err;
		});

	}
	else if (data.currencyPair === 'USDT_STR'){
		dbo.collection("usdt_str").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_ETH'){
		dbo.collection("usdt_eth").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_XRP'){
		dbo.collection("usdt_xrp").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_BCH'){
		dbo.collection("usdt_bch").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_NXT'){
		dbo.collection("usdt_nxt").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_LTC'){
		dbo.collection("usdt_ltc").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_ETC'){
		dbo.collection("usdt_etc").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_ZEC'){
		dbo.collection("usdt_zec").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_XMR'){
		dbo.collection("usdt_xmr").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_REP'){
		dbo.collection("usdt_rep").insertOne(input, function(err, res) {
			if (err) throw err;
		});
	}
	else if (data.currencyPair === 'USDT_DASH'){
		dbo.collection("usdt_dash").insertOne(input, function(err, res) {
			if (err) throw err;
		});
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
/* POLONIEX DATA INSERTION END */

	
});//MongoClient Connect

