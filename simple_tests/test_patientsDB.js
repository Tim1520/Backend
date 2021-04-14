var patientsDB = require('../patientsDB');

var patientInfo1 = {
    name : "John Doe",
    dob : "1987-07-02"
};

var patientInfo2 = {
    name : "Jane Doe",
    dob : "1989-03-04"
};

var patientInfo3 = {
    name : "John Smith",
    dob : "1959-05-20"
};

// Add patient 1
patientsDB.newPatientData('TestDoctor1', 'TestPatient1', patientInfo1, function(err, res) {
    if(err) {
        throw err;
    } else {
        // Try adding patient 1 again
        patientsDB.newPatientData('TestDoctor2', 'TestPatient1', patientInfo2, function(err, res) {
            if(err) {
                console.log(err);

                // Add patient 2
                patientsDB.newPatientData('TestDoctor1', 'TestPatient2', patientInfo2, function(err, res) {
                    if(err) {
                        throw err;
                    } else {
                        // Add patient 3
                        patientsDB.newPatientData('TestDoctor2', 'TestPatient3', patientInfo3, function(err, res) {
                            if(err) {
                                throw err;
                            } else {
                                // Update data on patient 3
                                patientInfo3.dob = "1960-05-20"

                                patientsDB.setPatientData('TestPatient3', patientInfo3, function(err, res) {
                                    if(err) {
                                        throw err;
                                    } else {
                                        // Get patients of doctor 1
                                        patientsDB.getPatientData('TestDoctor1', true, function(err, res) {
                                            if(err) {
                                                throw err;
                                            } else {
                                                console.log(res);

                                                // Get patient 3
                                                patientsDB.getPatientData('TestPatient3', false, function(err, res) {
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
            } else {
                throw 'Invalid Patient Added';
            }
        });
    }
});
