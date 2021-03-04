var db = require('./databaseInterface');

// Set collection name and initialize
db.initialize('PatientData');

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
  db.getQuery(query, callback);
}

// Set patient data from patient id
function setPatientData(patientID, newPatientData, callback) {
  // Choose query based on if this is a doctor
  var query = { patient : patientID };
  var setData = { $set : { patientData : newPatientData } };

  // Run Query
  db.setQuery(query, setData, callback);
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
  db.insertData(dbObj, callback);
}

module.exports = { getPatientData, setPatientData, newPatientData };
