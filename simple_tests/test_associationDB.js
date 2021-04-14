var associationDB = require('../associationDB');

// Add Patient 1 with Device 1
associationDB.newAssociation('TestPatient1', 'TestDevice1', function(err, res){
    if(err) {
        throw err;
    } else {
        // Try adding Patient 2 with Device 2
        associationDB.newAssociation('TestPatient2', 'TestDevice1', function(err, res){
            if(err) {
                console.log(err);

                // Add Patient 2 with Device 2
                associationDB.newAssociation('TestPatient2', 'TestDevice2', function(err, res){
                    if(err) {
                        throw err;
                    } else {
                        // Try setting Patient 2 to device 1
                        associationDB.setAssociation('TestPatient2', 'TestDevice1', function(err, res){
                            if(err) {
                                console.log(err);
                                
                                // Set Patient 2 to Device 3
                                associationDB.setAssociation('TestPatient2', 'TestDevice3', function(err, res){
                                    if(err) {
                                        throw err;
                                    } else {

                                        // Display associations for patient 1 and patient 2
                                        associationDB.getAssociation('TestPatient1', true, function(err, res){
                                            if(err) {
                                                throw err;
                                            } else {
                                                console.log(res);

                                                associationDB.getAssociation('TestDevice3', false, function(err, res){
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
                            } else {
                                throw 'Set Invalid Assoc'
                            }
                        });
                    }
                });
            } else {
                throw 'Created Invalid Assoc'
            }
        });
    }
});