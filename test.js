var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
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
var market = new mongoose.Schema({
	"Sname" : {type : String, ref : 'sitename'},
	"Mname" : {type : String, unique : true}
});
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
var sitename = mongoose.model('sitename', tradeSite, 'sitename');
var marketname = mongoose.model('marketname', market, 'marketname');
// Poloniex
var PoloniexSite = new sitename({Sname : 'Poloniex'});
PoloniexSite.save(function (err){
	//if(err) return handleError(err);
})
var PoloniexMarket = new marketname({Sname : PoloniexSite.Sname, Mname : 'usdt_btc'});
PoloniexMarket.save(function (err){
	//if(err) return handleError(err);
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