var mongoose = require('mongoose');
const PoloniexApiPush = require('poloniex-api-push');
var bittrex = require('node-bittrex-api');

// connect to MongoDB / the name of DB is set to 'coinsdaq'
mongoose.connect('mongodb://coinsdaq:coinsdaq@coinsdaq-shard-00-00-kon04.mongodb.net:27017/coinsdaq?ssl=true&authSource=admin');

var db = mongoose.connection;

// we get notified if error occurs
db.on('error', console.error.bind(console, 'DB connection error:'));

// executed when the connection opens
db.once('open', function callback () {
      console.log("DB connection open");
});

var tradedata_schema = new mongoose.Schema({
	"Sname" : String,
	"date" : Date,
	"type" : String,
	"rate" : Number,
	"amount" : Number,
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

var insertData = function(currencyPair, data, Sname){

	if(Sname === 'POL'){
		DATA_SCHEMA = {
			Sname : Sname,
			date : data.date,
			type : data.type,
			rate : Number(data.rate),
			amount : Number(data.amount),
			total : (data.rate*data.amount)
		}
	}
	else if(Sname === 'BIT'){
		DATA_SCHEMA = {
			Sname : Sname,
			date : data.date,
			type : data.OrderType,
			rate : data.Rate,
			amount : data.Quantity,
			total : (data.Rate*data.Quantity)
		}
	}
	db.collection(currencyPair).save(DATA_SCHEMA, function(err,res){
		if(err) throw err;
	})
}

poloPush.init().then(() => {

	console.log("Poloniex Websocket Connect")
	var Sname = "POL"

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
    	var currencyPair = "USDT_BTC";
    	insertData(currencyPair, trade, Sname);
  	});
    poloPush.on('USDT_STR-trade', (trade) => {
		var currencyPair = "USDT_STR";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_ETH-trade', (trade) => {
  		var currencyPair = "USDT_ETH";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_XRP-trade', (trade) => {
  		var currencyPair = "USDT_XRP";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_BCH-trade', (trade) => {
		var currencyPair = "USDT_BCH";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_NXT-trade', (trade) => {
  		var currencyPair = "USDT_NXT";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_LTC-trade', (trade) => {
		var currencyPair = "USDT_LTC";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_ETC-trade', (trade) => {
  		var currencyPair = "USDT_ETC";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_ZEC-trade', (trade) => {
  		var currencyPair = "USDT_ZEC";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_XMR-trade', (trade) => {
  		var currencyPair = "USDT_XMR";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_REP-trade', (trade) => {
  		var currencyPair = "USDT_REP";
    	insertData(currencyPair, trade, Sname);
  	});
  	poloPush.on('USDT_DASH-trade', (trade) => {
  		var currencyPair = "USDT_DASH";
    	insertData(currencyPair, trade, Sname);
  	});
});

bittrex.options({

	websockets: {
	    onConnect: function() {

	    console.log('Bittrex Websocket connected');

	    	var Sname = "BIT";

		    bittrex.websockets.subscribe(['USDT-BTC'], function(data) {

		    var currencyPair = "USDT_BTC";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-ETH'], function(data) {

		        var currencyPair = "USDT_ETH";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-NEO'], function(data) {

		        var currencyPair = "USDT_NEO";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-XRP'], function(data) {

		        var currencyPair = "USDT_XRP";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-ADA'], function(data) {

		        var currencyPair = "USDT_ADA";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-LTC'], function(data) {

		        var currencyPair = "USDT_NEO";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-ETC'], function(data) {

		        var currencyPair = "USDT_NEO";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-BCC'], function(data) {

		        var currencyPair = "USDT_BCH";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-XVG'], function(data) {

		        var currencyPair = "USDT_XVG";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-OMG'], function(data) {

		        var currencyPair = "USDT_OMG";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-XMR'], function(data) {

		        var currencyPair = "USDT_XMR";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-BTG'], function(data) {

		        var currencyPair = "USDT_BTG";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-ZEC'], function(data) {

		        var currencyPair = "USDT_ZEC";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-DASH'], function(data) {

		        var currencyPair = "USDT_DASH";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
		          		}
		         	});
		        }
		    });

		    bittrex.websockets.subscribe(['USDT-NXT'], function(data) {

		        var currencyPair = "USDT_NXT";

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				insertData(currencyPair, obj, Sname);
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

