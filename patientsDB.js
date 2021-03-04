const { debugPort } = require('process');

var MongoClient = require('mongodb').MongoClient;
var url =  'mongodb://localhost:27017/';
var dbName = 'ZipZapZopDB';
var collectionName = 'PatientData';
 
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

// Query patient data from patient or doctor id
function getPatientData(userID, isDoctor, callback) {
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

// Set patient data from patient id
function setPatientData(patientID, newPatientData, callback) {
  // Choose query based on if this is a doctor
  var query = { patient : patientID };
  var setData = { $set : { patientData : newPatientData } };

  // Run Query
  setQuery(query, setData, callback);
}

// Add a new patient data
function newPatientData(doctorID, patientID, patientDataObj, callback) {
  // Create regiment object
  var dbObj = { 
    doctor : doctorID,
    patient : patientID,
    patientData : patientDataObj
    };

  // Insert object
  insertData(dbObj, callback);
}
