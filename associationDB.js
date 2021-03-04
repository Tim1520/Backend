var db = require('./databaseInterface');

// Set collection name and initialize
db.initialize('Associations');

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
  db.getQuery(query, callback);
}

// Set device association from patient id
function setAssociation(patientID, deviceID, callback) {
  // Choose query based on if this is a doctor
  var query = { patient : patientID };
  var setData = { $set : { device : deviceID } };

  // Run Query
  db.setQuery(query, setData, callback);
}

// Add a new device association
function newAssociation(deviceID, patientID, callback) {
  // Create regiment object
  var dbObj = { 
    patient : deviceID,
    device : patientID
    };

  // Insert object
  db.insertData(dbObj, callback);
}

module.exports = { getAssociation, setAssociation, newAssociation };
