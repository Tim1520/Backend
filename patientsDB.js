var db = require('./databaseInterface');

// Set collection name and initialize
db.initialize('PatientData');

// Query patient data from patient or doctor id
function getPatientData(userID, isDoctor, callback) {
    var query;

    // Choose query based on if this is a doctor
    if (isDoctor) {
        query = { doctor: userID };
    } else {
        query = { patient: userID };
    }

    // Run Query
    db.getQuery(query, callback);
}

// Set patient data from patient id
function setPatientData(patientID, newPatientData, callback) {
    var query = { patient: patientID };
    var setData = { $set: { patientData: newPatientData } };

    // Run Query
    db.setQuery(query, setData, callback);
}

// Add a new patient data
function newPatientData(doctorID, patientID, patientDataObj, callback) {
    // Create regiment object
    var dbObj = {
        doctor: doctorID,
        patient: patientID,
        patientData: patientDataObj
    };

    // Check if patient data exists
    getPatientData(patientID, false, function (err, res) {
        if (err) {
            throw err;
        } else {
            // Array length would be 0 if there is no patient data
            if (res.length == 0) {
                // Insert object
                db.insertData(dbObj, callback);
            } else {
                // Return error
                callback('Patient Exists', null);
            }
        }
    })
}

module.exports = { getPatientData, setPatientData, newPatientData };
