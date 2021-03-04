const { debugPort } = require('process');

var MongoClient = require('mongodb').MongoClient;
var url =  'mongodb://localhost:27017/';
var dbName = 'ZipZapZopDB';
var collectionName = 'Association';
 
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

// Grab all objects as an array from a query
function setQuery(query, value, callback) {
  // Connect to the database
  MongoClient.connect(url, function (err, db) {
    if(err) {
      console.log('ERROR connecting to: ' + url + '. ' + err);
    } else {
      var dbo = db.db(dbName);
      // Choose Database
      dbo.collection(collectionName).updateOne(query, value, function (err, res) {
        // Run Callback
        callback(err, res)

        // Close Database connection
        db.close();
      });
    }
  });
}

// Query device association from patient or device id
function getAssociation(uniqueID, isPatient, callback) {
  var query;

  // Choose query based on if this is a patient
  if(isPatient) {
    query = { patient : uniqueID };
  } else {
    query = { device : uniqueID };
  }

  // Run Query
  getQuery(query, callback);
}

// Set device association from patient id
function setAssociation(patientID, deviceID, callback) {
  // Choose query based on if this is a doctor
  var query = { patient : patientID };
  var setData = { $set : { device : deviceID } };

  // Run Query
  setQuery(query, setData, callback);
}

// Add a new device association
function newAssociation(deviceID, patientID, callback) {
  // Create regiment object
  var dbObj = { 
    patient : deviceID,
    device : patientID
    };

  // Insert object
  insertData(dbObj, callback);
}
