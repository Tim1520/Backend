var db = require('./databaseInterface');

// Set collection name and initialize
db.initialize('Usage');

// Query patient regiment from patient or doctor id
function getUsageData(deviceID, callback) {
  // Create query for usage data
  var query = { device : deviceID };

  // Run Query
  db.getQuery(query, callback);
}

// Add recent usage data to the database
function newUsageData(deviceID, usageObj, callback) {
  // Create regiment object
  var dbObj = {
    device : deviceID,
    data : usageObj
    };

  // Insert object
  db.insertData(dbObj, callback);
}

module.exports = { getUsageData, newUsageData };
