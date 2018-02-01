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

var currencyPair_polo = new Array("USDT_BTC","USDT_STR","USDT_ETH","USDT_XRP","USDT_BCH","USDT_NXT",
                             "USDT_LTC","USDT_ETC","USDT_ZEC","USDT_XMR","USDT_REP","USDT_DASH");

var currencyPair_bittrex = new Array("USDT-BTC","USDT-ETH","USDT-XRP","USDT-NXT","USDT-LTC",
                            "USDT-ETC","USDT-ZEC","USDT-XMR","USDT-DASH",
                            "USDT-NEO","USDT-ADA","USDT-XVG","USDT-OMG","USDT-BTG","USDT-BCC");

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


/* chart data array initialization */
var site = new Array(6);
var POL_chartdata = new Array(6);
var BIT_chartdata = new Array(6);

for(var i = 0 ; i < 6 ; i++ ){
	POL_chartdata[i] = new Array(currencyPair_polo.length);
	BIT_chartdata[i] = new Array(currencyPair_bittrex.length);
	site[i] = new Array(site_name.length);
}

cron.schedule('*/1 * * * *', function(){
		
	var currentTime = Math.floor(Date.now()/1000);
	var pastTime = currentTime - 60;
	
	var snum = -1;
	var open = 0;
	var high = 0;
	var low = 0;
	var close = 0;
	var volumeAMOUNT = 0;
	var volumeRate = 0;

	for(var i in currencyPair_polo){
//모든 마켓들의 배열로 교체해야함 

		db.collection(currencyPair_polo[i]).find({ date:{$lt:currentTime,$gt:pastTime}}).toArray(function(err, filter){
//화폐들의 체결 내역 -> filter

			if (err) throw err;
			
			for(var j in filter){
//filter를 하나씩 읽음				

				var result = filter[j];

				for(var k in site_name){
					if(result.Sname === site_name[k]){
						snum = k;
					}
				}
//하나씩 읽은 결과의 회사 이름을 알아냄

				if (open == 0){
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

				if(result.Sname === 'POL'){

				}
				else if(result.Sname === 'BIT'){

				}
			}

		});		
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

  	/*
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
  	});*/
});

/*
bittrex.options({

	websockets: {
	    onConnect: function() {

	    	console.log('Bittrex Websocket connected');

	    	var Sname = "BIT";
		    
		    bittrex.websockets.subscribe(currencyPair_bittrex, function(data) {

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

*/