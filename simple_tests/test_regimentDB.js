const regimentDB = require('../regimentDB');

var regiment1 = {
    frequency : 100,
    voltage : 3,
    current : 1
}

var regiment2 = {
    frequency : 120,
    voltage : 3,
    current : 1
}

console.log('Add a new patient');
regimentDB.newPatientRegiment('doctor1', 'patient1', regiment1, function (err, res) {
    if (err) {
        throw err;
    }

    console.log('Regiments with doctor id: doctor1');
    regimentDB.getPatientRegiment('doctor1', true, function (err, res) {
        if (err) {
            throw err;
        } else {
            console.log(res);
        }

        console.log('Regiments with patient id: patient1');
        regimentDB.getPatientRegiment('patient1', false, function (err, res) {
            if (err) {
                throw err;
            } else {
                console.log(res);
            }
            console.log('Set new regiment for patient1');

            regimentDB.setPatientRegiment('patient1', regiment2, function (err, res) {
                if (err) {
                    throw err;
                }
                console.log('Regiments with doctor id: doctor1');
                regimentDB.getPatientRegiment('doctor1', true, function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.log(res);
                    }
                });
            });
        });
    });
});



