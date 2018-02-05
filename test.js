var mongoose = require('mongoose');
const PoloniexApiPush = require('poloniex-api-push');
var bittrex = require('node-bittrex-api');
var cron = require('node-cron');
	
// connect to MongoDB / the name of DB is set to 'coinsdaq'
mongoose.connect('mongodb://coinsdaq:coinsdaq@coinsdaq-shard-00-00-kon04.mongodb.net:27017/coinsdaq?ssl=true&authSource=admin');

var db = mongoose.connection;

// we get notified if error occurs
db.on('error', console.error.bind(console, 'DB connection error:'));

// executed when the connection opens
db.once('open', function callback () {
      console.log("DB connection open");
});


/* DATABASE set up */

var tradedata_schema = new mongoose.Schema({
	"Sname" : String,
	"date" : Date,
	"type" : String,
	"rate" : Number,
	"amount" : Number,
	"total" : Number
});

var chartdata_schema = new mongoose.Schema({
	"createTime" : Date,
	"Sname" : String,
	"open" : Number,
	"high" : Number,
	"low" : Number,
	"close" : Number,
	"volumeRate" : Number,
	"volumeAMOUNT" : Number
});

const poloPush = new PoloniexApiPush();

var site_name = new Array("POL","BIT");

var MARKETSTATUS = new Array("USDT_ADA","USDT_BCH","USDT_BTC","USDT_BTG","USDT_DASH","USDT_ETC",
						"USDT_ETH","USDT_LTC","USDT_NEO","USDT_NXT","USDT_OMG","USDT_REP","USDT_STR",
						"USDT_XMR","USDT_XRP","USDT_XVG","USDT_ZEC");

var currencyPair_polo = new Array("","USDT_BCH","USDT_BTC","","USDT_DASH","USDT_ETC",
						"USDT_ETH","USDT_LTC","","USDT_NXT","","USDT_REP","USDT_STR",
						"USDT_XMR","USDT_XRP","","USDT_ZEC");

var currencyPair_bit = new Array("USDT-ADA","USDT-BCH","USDT-BTC","USDT-BTG","USDT-DASH","USDT-ETC",
						"USDT-ETH","USDT-LTC","USDT-NEO","USDT-NXT","USDT-OMG","","",
						"USDT-XMR","USDT-XRP","USDT-XVG","USDT-ZEC");

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

var USDT_BTC_Chart = mongoose.model('USDT_BTC_Chart', chartdata_schema, 'USDT_BTC_Chart'); 
var USDT_STR_Chart = mongoose.model('USDT_STR_Chart', chartdata_schema, 'USDT_STR_Chart');
var USDT_ETH_Chart = mongoose.model('USDT_ETH_Chart', chartdata_schema, 'USDT_ETH_Chart'); 
var USDT_XRP_Chart = mongoose.model('USDT_XRP_Chart', chartdata_schema, 'USDT_XRP_Chart'); 
var USDT_BCH_Chart = mongoose.model('USDT_BCH_Chart', chartdata_schema, 'USDT_BCH_Chart'); 
var USDT_NXT_Chart = mongoose.model('USDT_NXT_Chart', chartdata_schema, 'USDT_NXT_Chart'); 
var USDT_LTC_Chart = mongoose.model('USDT_LTC_Chart', chartdata_schema, 'USDT_LTC_Chart'); 
var USDT_ETC_Chart = mongoose.model('USDT_ETC_Chart', chartdata_schema, 'USDT_ETC_Chart');
var USDT_ZEC_Chart = mongoose.model('USDT_ZEC_Chart', chartdata_schema, 'USDT_ZEC_Chart'); 
var USDT_XMR_Chart = mongoose.model('USDT_XMR_Chart', chartdata_schema, 'USDT_XMR_Chart'); 
var USDT_REP_Chart = mongoose.model('USDT_REP_Chart', chartdata_schema, 'USDT_REP_Chart'); 
var USDT_DASH_Chart = mongoose.model('USDT_DASH_Chart', chartdata_schema, 'USDT_DASH_Chart'); 
var USDT_NEO_Chart = mongoose.model('USDT_NEO_Chart', chartdata_schema, 'USDT_NEO_Chart'); 
var USDT_ADA_Chart = mongoose.model('USDT_ADA_Chart', chartdata_schema, 'USDT_ADA_Chart');
var USDT_XVG_Chart = mongoose.model('USDT_XVG_Chart', chartdata_schema, 'USDT_XVG_Chart'); 
var USDT_OMG_Chart = mongoose.model('USDT_OMG_Chart', chartdata_schema, 'USDT_OMG_Chart'); 
var USDT_BTG_Chart = mongoose.model('USDT_BTG_Chart', chartdata_schema, 'USDT_BTG_Chart'); 

cron.schedule('*/1 * * * *', function(){
		
	var currentTime = Math.floor(Date.now()/1000);
	var pastTime = currentTime - 60;

	for(var i = 0 ; i < MARKETSTATUS.length ; i++){
		
		(function(i){
		
		var open = 0;
		var high = 0;
		var low = 0;
		var close = 0;
		var volumeAMOUNT = 0;
		var volumeRate = 0;

			db.collection(MARKETSTATUS[i]).find({Sname:'POL',date:{$lt:currentTime,$gte:pastTime}}).toArray(function(err, filter){

				if (err) throw err;
				
					for(var j =  0; j < filter.length ; j++){

						var result = filter[j];

							if (open === 0) {
								open = result.rate;
								high = result.rate;
								low = result.rate;
							}

						if (result.rate >= high){
							high = result.rate;
						}

						if (result.rate <= low){
							low = result.rate;
						}

						close = result.rate;	

						volumeRate += result.rate;
						volumeAMOUNT += result.amount;
					}

				var collectionName = new String;
				collectionName = MARKETSTATUS[i]+"_chart";
					
					chartdata_schema = {
						createTime : pastTime,
						Sname : 'POL',
						open : open,
						high : high,
						low : low,
						close : close,
						volumeRate : volumeRate,
						volumeAMOUNT : volumeAMOUNT
					}	
				db.collection(collectionName).save(chartdata_schema, function(err,res){
					if(err) throw err;
				});
			});
		})(i);	
	}

});

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
	});
	
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
		    
		    bittrex.websockets.subscribe(currencyPair_bit, function(data) {

		        if (data.M === 'updateExchangeState') {
		          
		          	data.A.forEach(function(data_for) {

		          		for(var i = 0; i < data_for.Fills.length; i++){
		          			
		          			var obj = data_for.Fills[i];
		          			var t_time = Math.floor(Date.parse(obj.TimeStamp)/1000)+32400;

			  				obj.date = t_time;

			  				var pair = data_for.MarketName.split("-");
			  				if(pair[1] === 'BCC'){
			  					pair[1] = 'BCH';
			  				}
			  				var market = pair[0]+"_"+pair[1];
			
			  				insertData(market, obj, Sname);
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

