var usageDB = require('../usageDB');

var usageData = {
    timestamp : '2021-03-03-19:36:22',
    duration : 60,
    avgImpedence : 450
};

// Add usage data device 1
usageDB.newUsageData('TestDevice1', usageData, function(err, res) {
    if(err) {
        throw err;
    } else {
        usageData.timestamp = '2021-03-03-20:36:22'

        // Add new usage data for device 1
        usageDB.newUsageData('TestDevice1', usageData, function(err, res) {
            if(err) {
                throw err;
            } else {
                usageData.timestamp = '2021-03-03-21:36:22'
                usageData.avgImpedence = 500;

                // Add usage data device 2
                usageDB.newUsageData('TestDevice2', usageData, function(err, res) {
                    if(err) {
                        throw err;
                    } else {
                
                        // Display usage data
                        usageDB.getUsageData('TestDevice1', function(err, res) {
                            if(err) {
                                throw err;
                            } else {

                                console.log(res);
                        
                                usageDB.getUsageData('TestDevice2', function(err, res) {
                                    if(err) {
                                        throw err;
                                    } else {
                                        console.log(res);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});