const { debugPort } = require('process');

var MongoClient = require('mongoose').MongoClient;
var url =  'mongodb://localhost:27017/';
var dbName = 'ZipZapZopDB';
var collectionName = 'Regiments';
 
// Connect to the database, creates collection if none exists
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('ERROR connecting to: ' + url + '. ' + err);
  } else {
    console.log('Successfully connected to: ' + url);
    var dbo = db.db(dbName);
    dbo.createCollection(collectionName, function(err, res) {
      if (err) {
        console.log('ERROR could not create collection');
      } else {
        console.log("Collection Exists");
      }
      db.close();
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

// Query patient regiment from patient or doctor id
function getPatientRegiment(userID, isDoctor, callback) {
  var query;

  // Choose query based on if this is a doctor
  if(isDoctor) {
    query = { doctor : userID };
  } else {
    query = { patient : userID };
  }

  // Run Query
  getQuery(query, callback);
}

// Set patient regiment from patient id
function setPatientRegiment(patientID, newRegiment, callback) {
  // Choose query based on if this is a doctor
  var query = { patient : patientID };
  var setValue = { $set : { regiment : newRegiment } };

  // Run Query
  setQuery(query, setValue, callback);
}

// Add a new patient's regiment
function newPatientRegiment(doctorID, patientID, regimentObj, callback) {
  // Create regiment object
  var dbObj = { 
    doctor : doctorID,
    patient : patientID,
    regiment : regimentObj
    };

  // Insert object
  insertData(dbObj, callback);
}
