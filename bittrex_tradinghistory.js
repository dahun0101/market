var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var bittrex = require('node-bittrex-api');
var cron = require('node-cron');

/*-------------------------------------mongodb를 nodejs와 연동한다.--------------------------------------*/
// connect to MongoDB / the name of DB is set to 'coinsdaq'
//mongoose.connect('mongodb://coinsdaq:coinsdaq@coinsdaq-shard-00-00-kon04.mongodb.net:27017/coinsdaqoo?ssl=true&authSource=admin');
mongoose.connect('mongodb://localhost:27017/localbittrex');
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
	/*"type":String,
	"rate":Number,
	"amount":Number,
	"date":Date,*/
    "trade":Object,
	"total":Number
});

var chart_schema = new mongoose.Schema({
    "createTime": Date,
    "Sname": String,
    "open": Number,
    "high": Number,
    "low": Number,
    "close": Number,
    "volumeRate": Number, 
    "volumeAccount": Number 
});

var currencyPair_polo = new Array("USDT_BTC","USDT_STR","USDT_ETH","USDT_XRP","USDT_BCH","USDT_NXT",
                                  "USDT_LTC","USDT_ETC","USDT_ZEC","USDT_XMR","USDT_REP","USDT_DASH");
var dBCollection_polo = new Array("USDT_BTC","USDT_STR","USDT_ETH","USDT_XRP","USDT_BCH","USDT_NXT",
                                  "USDT_LTC","USDT_ETC","USDT_ZEC","USDT_XMR","USDT_REP","USDT_DASH");
var chartCollection_polo = new Array("USDT_BTC","USDT_STR","USDT_ETH","USDT_XRP","USDT_BCH","USDT_NXT",
                                     "USDT_LTC","USDT_ETC","USDT_ZEC","USDT_XMR","USDT_REP","USDT_DASH");


var currencyPair_bittrex = new Array("USDT-BTC","USDT-ETH","USDT-XRP","USDT-NXT","USDT-LTC",
									 "USDT-ETC","USDT-ZEC","USDT-XMR","USDT-DASH","USDT-NEO",
                                     "USDT-ADA","USDT-XVG","USDT-OMG","USDT-BTG","USDT-BCC");
var cpCollection_bittrex = new Array("USDT_BTC", "USDT_ETH","USDT_XRP","USDT_NXT","USDT_LTC",
                                     "USDT_ETC", "USDT_ZEC","USDT_XMR","USDT_DASH","USDT_NEO",
                                     "USDT_ADA", "USDT_XVG","USDT_OMG","USDT_BTG","USDT_BCH"); //BCC==BCH
var chartCollection_bittrex = new Array("USDT_BTC_Chart", "USDT_ETH_Chart","USDT_XRP_Chart","USDT_NXT_Chart","USDT_LTC_Chart",
                                        "USDT_ETC_Chart", "USDT_ZEC_Chart","USDT_XMR_Chart","USDT_DASH_Chart","USDT_NEO_Chart",
                                        "USDT_ADA_Chart", "USDT_XVG_Chart","USDT_OMG_Chart","USDT_BTG_Chart","USDT_BCH_Chart");


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

var USDT_BTC_Chart = mongoose.model('USDT_BTC_Chart', chart_schema, 'USDT_BTC_Chart'); 
var USDT_STR_Chart = mongoose.model('USDT_STR_Chart', chart_schema, 'USDT_STR_Chart'); 
var USDT_ETH_Chart = mongoose.model('USDT_ETH_Chart', chart_schema, 'USDT_ETH_Chart'); 
var USDT_XRP_Chart = mongoose.model('USDT_XRP_Chart', chart_schema, 'USDT_XRP_Chart'); 
var USDT_BCH_Chart = mongoose.model('USDT_BCH_Chart', chart_schema, 'USDT_BCH_Chart'); 
var USDT_NXT_Chart = mongoose.model('USDT_NXT_Chart', chart_schema, 'USDT_NXT_Chart'); 
var USDT_LTC_Chart = mongoose.model('USDT_LTC_Chart', chart_schema, 'USDT_LTC_Chart'); 
var USDT_ETC_Chart = mongoose.model('USDT_ETC_Chart', chart_schema, 'USDT_ETC_Chart'); 
var USDT_ZEC_Chart = mongoose.model('USDT_ZEC_Chart', chart_schema, 'USDT_ZEC_Chart'); 
var USDT_XMR_Chart = mongoose.model('USDT_XMR_Chart', chart_schema, 'USDT_XMR_Chart'); 
var USDT_REP_Chart = mongoose.model('USDT_REP_Chart', chart_schema, 'USDT_REP_Chart'); 
var USDT_DASH_Chart = mongoose.model('USDT_DASH_Chart', chart_schema, 'USDT_DASH_Chart'); 
var USDT_NEO_Chart = mongoose.model('USDT_NEO_Chart', chart_schema, 'USDT_NEO_Chart'); 
var USDT_ADA_Chart = mongoose.model('USDT_ADA_Chart', chart_schema, 'USDT_ADA_Chart'); 
var USDT_XVG_Chart = mongoose.model('USDT_XVG_Chart', chart_schema, 'USDT_XVG_Chart'); 
var USDT_OMG_Chart = mongoose.model('USDT_OMG_Chart', chart_schema, 'USDT_OMG_Chart'); 
var USDT_BTG_Chart = mongoose.model('USDT_BTG_Chart', chart_schema, 'USDT_BTG_Chart'); 

bittrex.options({
  websockets: {
    onConnect: function() {
      console.log('Bittrex Websocket connected');
      bittrex.websockets.subscribe(currencyPair_bittrex, function(data) 
      {
        if (data.M === 'updateExchangeState') 
        {
          data.A.forEach(function(t)
          {
            for(var i=0;i<t.Fills.length;i++)
            {
                var trade = t.Fills[i];
                var t_time = Math.floor(Date.parse(trade.TimeStamp))+32400000;
                
                for(var j=0;j<currencyPair_bittrex.length;j++)
                {
                    if(t.MarketName === currencyPair_bittrex[j])
                    {
                        trade.TimeStamp = t_time;
                        console.log(t.MarketName, trade.TimeStamp, typeof(trade.TimeStamp));
                        db.collection(cpCollection_bittrex[j]).save({Sname:'BIT', trade, total:trade.Rate*trade.Quantity},function(err,res){
                            if(err) throw err;
                        });
                    }
                }
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


/*----------------------------------------------------------------------------------------------------------------*/

cron.schedule('*/1 * * * *', function(){
    console.log('running a task every a minutes');
    var now = new Date().getTime();
    var start_time = (now-(now%60000))-60000;
    var end_time = start_time+60000;
    var Sname_t;
    var high_t;
    var low_t;
    var open_t;
    var close_t;
    var volumeRate_t;
    var volumeAccount_t;
    

    //console.log(now, start_time, end_time);
    for(var i=0;i < currencyPair_bittrex.length;i++)
    {           
        (function(i){
            db.collection(cpCollection_bittrex[i]).find({Sname:'BIT', 'trade.TimeStamp':{"$gte":start_time,"$lte":end_time}}).toArray(function(err,result)
            {
                if(err) throw err;
                if(result.length>0){
                    Sname_t = result[0].Sname; 
                    open_t = result[0].trade.Rate;
                    close_t =result[result.length-1].trade.Rate;
                    high_t = result[0].trade.Rate;
                    low_t = result[0].trade.Rate;
                    volumeRate_t = result[0].trade.Rate;
                    volumeAccount_t = result[0].total;

                    for(var j=1;j<result.length;j++)
                    {
                        if(high_t<result[j].trade.Rate)
                            high_t = result[j].trade.Rate;
                        if(low_t>result[j].trade.Rate)
                            low_t = result[j].trade.Rate;
                        if(result[j-1].trade.TimeStamp > result[j].trade.TimeStamp)
                            open_t = result[j].trade.Rate;
                        if(result[result.length-1].trade.TimeStamp < result[j-1].trade.TimeStamp)
                            close_t = result[j-1].trade.Rate;

                        volumeRate_t += result[j].trade.Rate;
                        volumeAccount_t += result[j].total;
                    }
                    /*console.log('open  ',open_t);
                    console.log('high  ',high_t);
                    console.log('low   ',low_t);
                    console.log('close ',close_t);
                    console.log('volumeRate ',volumeRate_t);
                    console.log('volumeAccount ',volumeAccount_t);*/
                }
                else{
                    Sname_t = null;
                    open_t = null;
                    close_t = null;
                    high_t = null;
                    low_t = null;
                    volumeRate_t = null;
                    volumeAccount_t =null;
                }

                db.collection(chartCollection_bittrex[i]).save({createTime: start_time, Sname: Sname_t, open: open_t, high: high_t, low: low_t, close: close_t, volumeRate: volumeRate_t, volumeAccount: volumeAccount_t},function(err,res){
                    if(err) throw err;
                });
                //console.log(cpCollection_bittrex[i],result);
            });  
        })(i);

        
    }

});
    