var mongoose = require('mongoose');
const PoloniexApiPush = require('poloniex-api-push');
var bittrex = require('node-bittrex-api');
/*mongodb를 nodejs와 연동한다.*/
// connect to MongoDB / the name of DB is set to 'coinsdaq'
mongoose.connect('mongodb://coinsdaq:coinsdaq@coinsdaq-shard-00-00-kon04.mongodb.net:27017/coinsdaq?ssl=true&authSource=admin');

var db = mongoose.connection;

// we get notified if error occurs
db.on('error', console.error.bind(console, 'DB connection error:'));

// executed when the connection opens
db.once('open', function callback () {
    // add your code here when opening
      console.log("DB connection open");
});

var tradedata_schema = new mongoose.Schema({
	"Sname" : String,
	"type" : String,
	"rate" : Number,
	"amount" : Number,
	"date" : Date,
	"total" : Number
});

const poloPush = new PoloniexApiPush();

var USDT_BTC = mongoose.model('USDT_BTC', tradedata_schema, 'USDT_BTC'); //bitcoin
var USDT_STR = mongoose.model('USDT_STR', tradedata_schema, 'USDT_STR'); //stellar
var USDT_ETH = mongoose.model('USDT_ETH', tradedata_schema, 'USDT_ETH'); //ethereum
var USDT_XRP = mongoose.model('USDT_XRP', tradedata_schema, 'USDT_XRP'); //ripple
var USDT_BCH = mongoose.model('USDT_BCH', tradedata_schema, 'USDT_BCH'); //bitcoin cash
var USDT_NXT = mongoose.model('USDT_NXT', tradedata_schema, 'USDT_NXT'); //nxt
var USDT_LTC = mongoose.model('USDT_LTC', tradedata_schema, 'USDT_LTC'); //litecoin
var USDT_ETC = mongoose.model('USDT_ETC', tradedata_schema, 'USDT_ETC'); //ethereum classic
var USDT_ZEC = mongoose.model('USDT_ZEC', tradedata_schema, 'USDT_ZEC'); //Zcash
var USDT_XMR = mongoose.model('USDT_XMR', tradedata_schema, 'USDT_XMR'); //monero
var USDT_REP = mongoose.model('USDT_REP', tradedata_schema, 'USDT_REP'); //augur
var USDT_DASH = mongoose.model('USDT_DASH', tradedata_schema, 'USDT_DASH'); //dash
var USDT_NEO = mongoose.model('USDT_NEO', tradedata_schema, 'USDT_NEO'); //neo
var USDT_ADA = mongoose.model('USDT_ADA', tradedata_schema, 'USDT_ADA'); //ada
var USDT_XVG = mongoose.model('USDT_XVG', tradedata_schema, 'USDT_XVG'); //verge
var USDT_OMG = mongoose.model('USDT_OMG', tradedata_schema, 'USDT_OMG'); //omisego
var USDT_BTG = mongoose.model('USDT_BTG', tradedata_schema, 'USDT_BTG'); //bitcoin gold



poloPush.init().then(() => {

    poloPush.subscribe('USDT_BTC');
    poloPush.subscribe('USDT_STR');
    poloPush.subscribe('USDT_ETH');
    poloPush.subscribe('USDT_XRP');
    poloPush.subscribe('USDT_BCH');
    poloPush.subscribe('USDT_NXT');
    poloPush.subscribe('USDT_LTC');
    poloPush.subscribe('USDT_ETC');
    poloPush.subscribe('USDT_ZEC');
    poloPush.subscribe('USDT_XMR');
    poloPush.subscribe('USDT_REP');
    poloPush.subscribe('USDT_DASH');

    poloPush.on('USDT_BTC-trade', (trade) => {
    	
    	USDT_BTC = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

		db.collection("USDT_BTC").save(USDT_BTC, function(err,res){
		    	if(err) throw err;
		})
  	});

    poloPush.on('USDT_STR-trade', (trade) => {

    	USDT_STR = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_STR").save(USDT_STR,function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_ETH-trade', (trade) => {

  		USDT_ETH = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_ETH").save(USDT_ETH, function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_XRP-trade', (trade) => {

  		USDT_XRP = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_XRP").save(USDT_XRP,function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_BCH-trade', (trade) => {

  		USDT_BCH = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_BCH").save(USDT_BCH,function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_NXT-trade', (trade) => {

  		USDT_NXT = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_NXT").save(USDT_NXT,function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_LTC-trade', (trade) => {

  		USDT_LTC = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_LTC").save(USDT_LTC,function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_ETC-trade', (trade) => {

  		USDT_ETC = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_ETC").save(USDT_ETC,function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_ZEC-trade', (trade) => {

  		USDT_ZEC = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_ZEC").save(USDT_ZEC,function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_XMR-trade', (trade) => {

  		USDT_XMR = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_XMR").save(USDT_XMR,function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_REP-trade', (trade) => {

  		USDT_REP = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_REP").save(USDT_REP,function(err,res){
	    	if(err) throw err;
	    })
  	});
  	poloPush.on('USDT_DASH-trade', (trade) => {

  		USDT_DASH = {
    		Sname : 'POL',
    		date : trade.date,
    		type : trade.type,
    		rate : trade.rate,
    		amount : trade.amount,
    		total : (trade.rate*trade.amount)
    	}

	    db.collection("USDT_DASH").save(USDT_DASH,function(err,res){
	    	if(err) throw err;
	    })
  	});
});

bittrex.options({
	websockets: {
	    onConnect: function() {

	    console.log('Bittrex Websocket connected');

		    bittrex.websockets.subscribe(['USDT-BTC'], function(data) {

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			
			          			USDT_BTC = {
						    		Sname : 'BIT',
						    		date : obj.TimeStamp,
						    		type : obj.OrderType,
						    		rate : obj.Rate,
						    		amount : obj.Quantity,
						    		total : (obj.Rate*obj.Quantity)
						    	}

			          			 db.collection("USDT_BTC").save(USDT_BTC, function(err,res){
			          			 	if(err) throw err;
			          			 })
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-ETH'], function(data) {

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			
			          			USDT_ETH = {
						    		Sname : 'BIT',
						    		date : obj.TimeStamp,
						    		type : obj.OrderType,
						    		rate : obj.Rate,
						    		amount : obj.Quantity,
						    		total : (obj.Rate*obj.Quantity)
						    	}

			          			 db.collection("USDT_ETH").save(USDT_ETH, function(err,res){
			          			 	if(err) throw err;
			          			 })
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-NEO'], function(data) {

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			
			          			USDT_NEO = {
						    		Sname : 'BIT',
						    		date : obj.TimeStamp,
						    		type : obj.OrderType,
						    		rate : obj.Rate,
						    		amount : obj.Quantity,
						    		total : (obj.Rate*obj.Quantity)
						    	}

			          			 db.collection("USDT_NEO").save(USDT_NEO, function(err,res){
			          			 	if(err) throw err;
			          			 })
		          		}
		         	});
		        }
		    });

	    },
	    onDisconnect: function() {
	      console.log('Websocket disconnected');
	    }
	}
});

var websocketClient;
bittrex.websockets.client(function(client) {
  websocketClient = client;
});

