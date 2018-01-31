var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const PoloniexApiPush = require('poloniex-api-push');

/*-------------------------------------mongodb를 nodejs와 연동한다.--------------------------------------*/
// connect to MongoDB / the name of DB is set to 'coinsdaq'
//mongoose.connect('mongodb://coinsdaq:coinsdaq@coinsdaq-shard-00-00-kon04.mongodb.net:27017/coinsdaqoo?ssl=true&authSource=admin');
mongoose.connect('mongodb://localhost:27017/localpolo');
var db = mongoose.connection;
// we get notified if error occurs
db.on('error', console.error.bind(console, 'DB connection error:'));
// executed when the connection opens
db.once('open', function callback () {
    // add your code here when opening
      console.log("DB connection open");
});


/*-----------------------------------------------------------------------------------------------------*/
var trade_schema = new mongoose.Schema({
	"Sname": String,
	"type":String,
	"rate":Number,
	"amount":Number,
	"date":Date,
	"total":Number
});
var currencyPair_polo = new Array("USDT_BTC","USDT_STR","USDT_ETH","USDT_XRP","USDT_BCH","USDT_NXT",
                                  "USDT_LTC","USDT_ETC","USDT_ZEC","USDT_XMR","USDT_REP","USDT_DASH");
var dBCollection_polo = new Array("USDT_BTC","USDT_STR","USDT_ETH","USDT_XRP","USDT_BCH","USDT_NXT",
                                  "USDT_LTC","USDT_ETC","USDT_ZEC","USDT_XMR","USDT_REP","USDT_DASH");

var currencyPair_bittrex = new Array("USDT-BTC","USDT-ETH","USDT-XRP","USDT-NXT","USDT-LTC",
                                     "USDT-ETC","USDT-ZEC","USDT-XMR","USDT-DASH","USDT-NEO",
                                     "USDT-ADA","USDT-XVG","USDT-OMG","USDT-BTG","USDT-BCC");
var dBCollection_bittrex = new Array("USDT_BTC", "USDT_ETH","USDT_XRP","USDT_NXT","USDT_LTC",
                                     "USDT_ETC", "USDT_ZEC","USDT_XMR","USDT_DASH","USDT_NEO",
                                     "USDT_ADA", "USDT_XVG","USDT_OMG","USDT_BTG","USDT_BCC");


var USDT_BTC = mongoose.model('USDT_BTC', trade_schema, 'USDT_BTC'); //bitcoin
var USDT_STR = mongoose.model('USDT_STR', trade_schema, 'USDT_STR'); //stellar
var USDT_ETH = mongoose.model('USDT_ETH', trade_schema, 'USDT_ETH'); //ethereum
var USDT_XRP = mongoose.model('USDT_XRP', trade_schema, 'USDT_XRP'); //ripple
var USDT_BCH = mongoose.model('USDT_BCH', trade_schema, 'USDT_BCH'); //bitcoin cash
var USDT_NXT = mongoose.model('USDT_NXT', trade_schema, 'USDT_NXT'); //nxt
var USDT_LTC = mongoose.model('USDT_LTC', trade_schema, 'USDT_LTC'); //litecoin
var USDT_ETC = mongoose.model('USDT_ETC', trade_schema, 'USDT_ETC'); //ethereum classic
var USDT_ZEC = mongoose.model('USDT_ZEC', trade_schema, 'USDT_ZEC'); //Zcash
var USDT_XMR = mongoose.model('USDT_XMR', trade_schema, 'USDT_XMR'); //monero
var USDT_REP = mongoose.model('USDT_REP', trade_schema, 'USDT_REP'); //augur
var USDT_DASH = mongoose.model('USDT_DASH', trade_schema, 'USDT_DASH'); //dash
var USDT_NEO = mongoose.model('USDT_NEO', trade_schema, 'USDT_NEO'); //neo
var USDT_ADA = mongoose.model('USDT_ADA', trade_schema, 'USDT_ADA'); //ada
var USDT_XVG = mongoose.model('USDT_XVG', trade_schema, 'USDT_XVG'); //verge
var USDT_OMG = mongoose.model('USDT_OMG', trade_schema, 'USDT_OMG'); //omisego
var USDT_BTG = mongoose.model('USDT_BTG', trade_schema, 'USDT_BTG'); //bitcoin gold



const poloPush = new PoloniexApiPush();

poloPush.init().then(() => {
  console.log("Poloniex Websocket Connect");
	for(i=0; i < currencyPair_polo.length ; i++){
			poloPush.subscribe(currencyPair_polo[i]);
	}

  
	poloPush.on('USDT_BTC-trade', (trade) => {

    	db.collection("USDT_BTC").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_BTC-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});
	
	poloPush.on('USDT_STR-trade', (trade) => {

    	db.collection("USDT_STR").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_STR-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_ETH-trade', (trade) => {

    	db.collection("USDT_ETH").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_ETH-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_XRP-trade', (trade) => {

    	db.collection("USDT_XRP").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_XRP-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_BCH-trade', (trade) => {

    	db.collection("USDT_BCH").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_BCH-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_NXT-trade', (trade) => {

    	db.collection("USDT_NXT").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_NXT-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_LTC-trade', (trade) => {

    	db.collection("USDT_LTC").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_LTC-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_ETC-trade', (trade) => {

    	db.collection("USDT_ETC").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_ETC-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_ZEC-trade', (trade) => {

    	db.collection("USDT_ZEC").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_ZEC-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_XMR-trade', (trade) => {

    	db.collection("USDT_XMR").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_XMR-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_REP-trade', (trade) => {

    	db.collection("USDT_REP").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_REP-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});

  	poloPush.on('USDT_DASH-trade', (trade) => {

    	db.collection("USDT_DASH").save({Sname:'pol', trade, total:trade.rate*trade.amount},function(err,res){
 			if(err) throw err;
 		});
   		console.log('USDT_DASH-trade',  trade.type, trade.rate, trade.amount,trade.date, trade.rate*trade.amount);
  	});
});
