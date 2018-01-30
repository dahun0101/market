var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const PoloniexApiPush = require('poloniex-api-push');

/*-------------------------------------mongodb를 nodejs와 연동한다.--------------------------------------*/
// connect to MongoDB / the name of DB is set to 'coinsdaq'
//mongoose.connect('mongodb://coinsdaq:coinsdaq@coinsdaq-shard-00-00-kon04.mongodb.net:27017/coinsdaqoo?ssl=true&authSource=admin');
mongoose.connect('mongodb://localhost:27017/localcoinsdaq');
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
var currencyPair = new Array("USDT_BTC","USDT_STR","USDT_ETH","USDT_XRP","USDT_BCH","USDT_NXT","USDT_LTC","USDT_ETC","USDT_ZEC","USDT_XMR","USDT_REP","USDT_DASH")

const poloPush = new PoloniexApiPush();

var USDT_BTC = mongoose.model('USDT_BTC', trade_schema, 'USDT_BTC'); //currencyPair[0]
var usdt_str = mongoose.model('usdt_str', trade_schema, 'usdt_str'); //currencyPair[1]
var usdt_eth = mongoose.model('usdt_eth', trade_schema, 'usdt_eth');//currencyPair[2]
var usdt_xrp = mongoose.model('usdt_xrp', trade_schema, 'usdt_xrp');//currencyPair[3]
var usdt_bch = mongoose.model('usdt_bch', trade_schema, 'usdt_bch');//currencyPair[4]
var usdt_nxt = mongoose.model('usdt_nxt', trade_schema, 'usdt_nxt');//currencyPair[5]
var usdt_ltc = mongoose.model('usdt_ltc', trade_schema, 'usdt_ltc');//currencyPair[6]
var usdt_etc = mongoose.model('usdt_etc', trade_schema, 'usdt_etc');//currencyPair[7]
var usdt_zec = mongoose.model('usdt_zec', trade_schema, 'usdt_zec');//currencyPair[8]
var usdt_xmr = mongoose.model('usdt_xmr', trade_schema, 'usdt_xmr');//currencyPair[9]
var usdt_rep = mongoose.model('usdt_rep', trade_schema, 'usdt_rep');//currencyPair[10]
var usdt_dash = mongoose.model('usdt_dash', trade_schema, 'usdt_dash');//currencyPair[11]



poloPush.init().then(() => {

	for(i=0; i < currencyPair.length ; i++){
			poloPush.subscribe(currencyPair[i]);
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

