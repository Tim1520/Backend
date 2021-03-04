var db = require('./databaseInterface');

// Set collection name and initialize
db.initialize('Associations');

// Query device association from patient or device id
function getAssociation(uniqueID, isPatient, callback) {
    var query;

    // Choose query based on if this is a patient
    if (isPatient) {
        query = { patient: uniqueID };
    } else {
        query = { device: uniqueID };
    }

    // Run Query
    db.getQuery(query, callback);
}

// Set device association from patient id
function setAssociation(patientID, deviceID, callback) {
    // Check if association already exists
    getAssociation(deviceID, false, function(err, res) {
        if(err) {
            throw err;
        } else {
            if(res.length == 0) {
                var query = { patient: patientID };
                var setData = { $set: { device: deviceID } };
            
                // Run Query
                db.setQuery(query, setData, callback);
            } else {
                callback('Invalid Association', null);
            }
        }
    });
}

// Add a new device association
function newAssociation(patientID, deviceID, callback) {
    // Create regiment object
    var dbObj = {
        patient: patientID,
        device: deviceID
    };

    var query = { 
        $or : [
            { patient : patientID },
            { device : deviceID }
        ]
    };

    db.getQuery(query, function (err, res) {
        if(err) {
            throw err;
        } else {
            // Array length would be 0 if there is no patient data
            if (res.length == 0) {
                // Insert object
                db.insertData(dbObj, callback);
            } else {
                // Return error
                callback('Patient already associated with device', null);
            }
        }
    });
}

module.exports = { getAssociation, setAssociation, newAssociation };
