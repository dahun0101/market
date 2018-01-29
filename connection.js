var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/integration_test", function(err, db) {
  test.equal(null, err);
  test.ok(db != null);

  db.collection("replicaset_mongo_client_collection").update({a:1}, {b:1}, {upsert:true}, function(err, result) {
    test.equal(null, err);
    test.equal(1, result);

    db.close();
    test.done();
  });
});