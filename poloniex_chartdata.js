var mongoose = require('mongoose');
const PoloniexApiPush = require('poloniex-api-push');
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
		"volumeAmount" : Number
	});

	const poloPush = new PoloniexApiPush();

	var currencyPair_polo = new Array("USDT_BCH","USDT_BTC","USDT_DASH","USDT_ETC",
							"USDT_ETH","USDT_LTC","USDT_NXT","USDT_REP","USDT_STR",
							"USDT_XMR","USDT_XRP","USDT_ZEC");

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

	var USDT_BTC_Chart = mongoose.model('USDT_BTC_min', chartdata_schema, 'USDT_BTC_Chart'); 
	var USDT_STR_Chart = mongoose.model('USDT_STR_min', chartdata_schema, 'USDT_STR_Chart');
	var USDT_ETH_Chart = mongoose.model('USDT_ETH_min', chartdata_schema, 'USDT_ETH_Chart'); 
	var USDT_XRP_Chart = mongoose.model('USDT_XRP_min', chartdata_schema, 'USDT_XRP_Chart'); 
	var USDT_BCH_Chart = mongoose.model('USDT_BCH_min', chartdata_schema, 'USDT_BCH_Chart'); 
	var USDT_NXT_Chart = mongoose.model('USDT_NXT_min', chartdata_schema, 'USDT_NXT_Chart'); 
	var USDT_LTC_Chart = mongoose.model('USDT_LTC_min', chartdata_schema, 'USDT_LTC_Chart'); 
	var USDT_ETC_Chart = mongoose.model('USDT_ETC_min', chartdata_schema, 'USDT_ETC_Chart');
	var USDT_ZEC_Chart = mongoose.model('USDT_ZEC_min', chartdata_schema, 'USDT_ZEC_Chart'); 
	var USDT_XMR_Chart = mongoose.model('USDT_XMR_min', chartdata_schema, 'USDT_XMR_Chart'); 
	var USDT_REP_Chart = mongoose.model('USDT_REP_min', chartdata_schema, 'USDT_REP_Chart'); 
	var USDT_DASH_Chart = mongoose.model('USDT_DASH_min', chartdata_schema, 'USDT_DASH_Chart'); 

	var USDT_BTC_Chart = mongoose.model('USDT_BTC_hour', chartdata_schema, 'USDT_BTC_Chart'); 
	var USDT_STR_Chart = mongoose.model('USDT_STR_hour', chartdata_schema, 'USDT_STR_Chart');
	var USDT_ETH_Chart = mongoose.model('USDT_ETH_hour', chartdata_schema, 'USDT_ETH_Chart'); 
	var USDT_XRP_Chart = mongoose.model('USDT_XRP_hour', chartdata_schema, 'USDT_XRP_Chart'); 
	var USDT_BCH_Chart = mongoose.model('USDT_BCH_hour', chartdata_schema, 'USDT_BCH_Chart'); 
	var USDT_NXT_Chart = mongoose.model('USDT_NXT_hour', chartdata_schema, 'USDT_NXT_Chart'); 
	var USDT_LTC_Chart = mongoose.model('USDT_LTC_hour', chartdata_schema, 'USDT_LTC_Chart'); 
	var USDT_ETC_Chart = mongoose.model('USDT_ETC_hour', chartdata_schema, 'USDT_ETC_Chart');
	var USDT_ZEC_Chart = mongoose.model('USDT_ZEC_hour', chartdata_schema, 'USDT_ZEC_Chart'); 
	var USDT_XMR_Chart = mongoose.model('USDT_XMR_hour', chartdata_schema, 'USDT_XMR_Chart'); 
	var USDT_REP_Chart = mongoose.model('USDT_REP_hour', chartdata_schema, 'USDT_REP_Chart'); 
	var USDT_DASH_Chart = mongoose.model('USDT_DASH_hour', chartdata_schema, 'USDT_DASH_Chart');

cron.schedule('5 */1 * * * *', function(){
		
	var currentTime = Math.floor((Date.now()/1000)-5);
	var pastTime = currentTime - 60;


	for(var i = 0 ; i < currencyPair_polo.length ; i++){
		
		(function(i){
		
		var open = 0;
		var high = 0;
		var low = 0;
		var close = 0;
		var volumeAmount = 0;
		var volumeRate = 0;

			db.collection(currencyPair_polo[i]).find({Sname:'POL',date:{$lt:currentTime,$gte:pastTime}}).toArray(function(err, filter){

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

						volumeRate += (result.rate*result.amount);
						volumeAmount += result.amount;
					}

				var collectionName = new String;
				collectionName = currencyPair_polo[i]+"_minutes";
					
					chartdata_schema = {
						createTime : pastTime,
						Sname : 'POL',
						open : open,
						high : high,
						low : low,
						close : close,
						volumeRate : volumeRate,
						volumeAmount : volumeAmount
					}	
				db.collection(collectionName).save(chartdata_schema, function(err,res){
					if(err) throw err;
				});
			});
		})(i);	
	}

});

cron.schedule('10 */60 * * * *', function(){
		
	var currentTime = Math.floor((Date.now()/1000) - 10);
	var pastTime = currentTime - 3600;

	for(var i = 0 ; i < currencyPair_polo.length ; i++){
		
		(function(i){
		
		var open = 0;
		var high = 0;
		var low = 0;
		var close = 0;
		var volumeAmount = 0;
		var volumeRate = 0;

			db.collection(currencyPair_polo[i]).find({Sname:'POL',date:{$lt:currentTime,$gte:pastTime}}).toArray(function(err, filter){

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

						volumeRate += (result.rate*result.amount);
						volumeAmount += result.amount;
					}

				var collectionName = new String;
				collectionName = currencyPair_polo[i]+"_hour";
					
					chartdata_schema = {
						createTime : pastTime,
						Sname : 'POL',
						open : open,
						high : high,
						low : low,
						close : close,
						volumeRate : volumeRate,
						volumeAmount : volumeAmount
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
