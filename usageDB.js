const { debugPort } = require('process');

var MongoClient = require('mongodb').MongoClient;
var url =  'mongodb://localhost:27017/';
var dbName = 'ZipZapZopDB';
var collectionName = 'Usage';
 
// Connect to the database, creates collection if none exists
MongoClient.connect(url, { useUnifiedTopology : true }, function (err, db) {
  if (err) {
    console.log('ERROR connecting to: ' + url + '. ' + err);
  } else {
    console.log('Successfully connected to: ' + url);
    var dbo = db.db(dbName);

    dbo.listCollections().toArray(function (err, collections) {
      if (err) {
        throw err;
      } else {
        // Check if collection has been created
        var exists;
        for (var i = 0; i < collections.length; i++) {
          if (collections[i].name == collectionName) {
            exists = true;
            break;
          }
        }

        // Create collection if it doesn't exist
        if (!exists) {
          dbo.createCollection(collectionName, function(err, res) {
            if (err) {
              console.log('ERROR could not create collection ' + err);
            } else {
              console.log("Collection Exists");
            }
            db.close();
          });
        } else {
          db.close();
        }
      }
    });
  }
});

function insertData(obj, callback) {
  // Connect to the database
  MongoClient.connect(url, function (err, db) {
    if(err) {
      console.log('ERROR connecting to: ' + url + '. ' + err);
    } else {
      var dbo = db.db(dbName);
      // Choose Database
      dbo.collection(collectionName).insertOne(obj, function (err, res) {
        // Run Callback
        callback(err, res)

        // Close Database connection
        db.close();
      });
    }
  });
}

// Grab all objects as an array from a query
function getQuery(query, callback) {
  // Connect to the database
  MongoClient.connect(url, function (err, db) {
    if(err) {
      console.log('ERROR connecting to: ' + url + '. ' + err);
    } else {
      var dbo = db.db(dbName);
      // Choose Database
      dbo.collection(collectionName).find(query).toArray(function (err, res) {
        // Run Callback
        callback(err, res)

        // Close Database connection
        db.close();
      });
    }
  });
}

// Query patient regiment from patient or doctor id
function getUsageData(deviceID, callback) {
  // Create query for usage data
  var query = { device : deviceID };

  // Run Query
  getQuery(query, callback);
}

// Add recent usage data to the database
function newUsageData(deviceID, usageObj, callback) {
  // Create regiment object
  var dbObj = {
    device : deviceID,
    data : usageObj
    };

  // Insert object
  insertData(dbObj, callback);
}
