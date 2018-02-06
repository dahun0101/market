var mongoose = require('mongoose');
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


var currencyPair_polo = new Array("USDT_BCH","USDT_BTC","USDT_DASH","USDT_ETC",
						"USDT_ETH","USDT_LTC","USDT_NXT","USDT_REP","USDT_STR",
						"USDT_XMR","USDT_XRP","USDT_ZEC");

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


cron.schedule('10 0 */1 * * *', function(){
		
	var currentTime = Math.floor((Date.now()/1000) - 10);
	var pastTime = currentTime - 3600;
	console.log(currentTime+"hour!!");

	for(var i = 0 ; i < currencyPair_polo.length ; i++){
		
		(function(i){
		
		var open = 0;
		var high = 0;
		var low = 0;
		var close = 0;
		var volumeAMOUNT = 0;
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

						volumeRate += result.rate;
						volumeAMOUNT += result.amount;
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
						volumeAMOUNT : volumeAMOUNT
					}	
				db.collection(collectionName).save(chartdata_schema, function(err,res){
					if(err) throw err;
				});
			});
		})(i);	
	}

});