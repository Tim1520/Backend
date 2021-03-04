var db = require('./databaseInterface');

// Set collection name and initialize
db.initialize('Regiments');

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
  db.getQuery(query, callback);
}

// Set patient regiment from patient id
function setPatientRegiment(patientID, newRegiment, callback) {
  // Choose query based on if this is a doctor
  var query = { patient : patientID };
  var setValue = { $set : { regiment : newRegiment } };

  // Run Query
  db.setQuery(query, setValue, callback);
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
  db.insertData(dbObj, callback);
}

module.exports = { getPatientRegiment, setPatientRegiment, newPatientRegiment };
