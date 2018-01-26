/* NPM */
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');


/* DB configuration */
var url = "mongodb://localhost:27017/";


/* MongoDB connection */
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	console.log("MongoClient : Database connected!");

	var dbo = db.db("mydb");

/* Mongoose connection */
mongoose.connect('mongodb://localhost:27017/mydb');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Mongo db connection OK.");
});


/* Config Schema */
//Site Schema -> Collection name is siteList
var tradeSite = new mongoose.Schema({
	"Sname" : {type : String, unique : true},
});

var siteList = mongoose.model('siteList', customer, 'siteList');

//Market Schema -> Collection name is marketList
var market = new mongoose.Schema({
	"Sname" : {type : String, ref : 'siteList'},
	"Mname" : {type : String, unique : true}
});

var marketList = mongoose.model('marketList', market, 'marketList');

//Data Schema
var data = new mongoose.Schema({
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

/* Site Data */
var siteArr = [{Sname : 'Poloniex'}];
	
	try
	{
		dbo.collection("siteList").insertMany(siteArr, function(err, res){});
		console.log("SiteList Insert Succes!");
	}
	catch(err){
		if(err.message.index.Of("11000") != -1)
		{
			Spark.setSciptError("ERROR", "ID already token");
		}
	}

var PoloMarket = [{Sname : 'Poloniex', Mname : 'usdt_btc'}];

	try
	{
		dbo.collection("marketList").insertMany(PoloMarket, function(err, res){});
		console.log("SiteList Insert Succes!");
	}
	catch(err){
		if(err.message.index.Of("11000") != -1)
		{
			Spark.setSciptError("ERROR", "ID already token");
		}
	}

var poloniexData = mongoose.model('poloniexData', data, 'poloniexData');

//Create Collection
	// dbo.createCollection("customers", function(err, res) {
	// 	if (err) throw err;
	// 	console.log("Collection created!");
	// });

//Setting Collection Index
	
	// dbo.collection("tradeSite").createIndex({Sname : 1}, {unique:true}, function(err, res){
	// 	if(err) throw err;
	// 	console.log("Index Setting!");
	// });

	// dbo.collection("market").createIndex({Mname})


//Insert Document

	var myobj = [{ name : "Company Inc", address : "Highway 37" }, {name : "cccc", address : "Highway 37"}];
	
});//MongoClient Connect

