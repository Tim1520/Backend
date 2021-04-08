const express = require('express');
const regimentDB = require('./regimentDB');

var admin = require('firebase-admin');

const app = express();
var path = require('path');

app.use(express.json());
app.use(express.static("public"));

const port = 80;    //8081 placeholder

//$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"


// var loginToken = "placeholder";
// var googleid = "12345";

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://doctor-patient-access-default-rtdb.firebaseio.com'
});

//Doctor save regimen to user uid
app.post('/doctorAddRegimen', (req,res) => {
    idToken = req.body.token;

    console.log("Call made");
    admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
        console.log("Sucessfully decoded doctor token")
        const uid = decodedToken.uid;
            // ...
        regimentDB.newPatientRegiment(decodedToken.uid, req.body.patientID, req.body.data, (err, result) => {
            if (err)
            {
                res.status(400).send(err);
            }
            else
            {
                res.status(200).send("Successfully added doctor regimen");
            }
            
        }  )


    })
    .catch((error) => {
        res.send("Caught an error, check server logs");
        console.log(error)
        // Handle error
    });

})

app.post('/doctorGetRegimens', (req,res) => {
    idToken = req.body.token;

    console.log("Call made");
    admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
        console.log("Sucessfully decoded token")
        const uid = decodedToken.uid;
            // ...
        regimentDB.getPatientRegiment(req.body.patientID, false, (err, result) => {
            if (err)
            {
                res.status(400).send(err);
            }
            else
            {
                res.status(200).send(result);
            }
            
        }  )


    })
    .catch((error) => {
        res.send("Caught an error, check server logs");
        console.log(error)
        // Handle error
    });

})

//Doctor get list of regimen from patient uid

app.get('/firebaseTest', (req,res) => {
    //idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NDY2MjEyMTQxMjQ4NzUxOWJiZjhlYWQ4ZGZiYjM3ODYwMjk5ZDciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZG9jdG9yLXBhdGllbnQtYWNjZXNzIiwiYXVkIjoiZG9jdG9yLXBhdGllbnQtYWNjZXNzIiwiYXV0aF90aW1lIjoxNjE2OTAyNTQ1LCJ1c2VyX2lkIjoiRnlFclZ0VnRZcVhhbUNXOFhuSGxYbXlxcTVJMiIsInN1YiI6IkZ5RXJWdFZ0WXFYYW1DVzhYbkhsWG15cXE1STIiLCJpYXQiOjE2MTY5MDI1NDcsImV4cCI6MTYxNjkwNjE0NywiZW1haWwiOiJzZWIuZ29uemFsZXpzZy4xOTk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNlYi5nb256YWxlenNnLjE5OTlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.OOoa87ZE0PKstfbFBmwaISQi3btnjPE98TLPNHCuUJSaXXTdQVuT1xfBo1DOx7hjGtSfVmxZZ-Zw6Zp7slfiQl9jvHcuIVoYV000ak8SgwagEBxfXzIBDQl-yAUkUjNe5NGgBuGlG7Lh1dbYP_ZYifZxFYw6tJInl9AZWbUsh6wANpAWTLrz3K8FNACWnNIJTqlvkPBLFnDSWwZEsPAVWXPfPuKpn0vHtsgKDZlTyP1MiKnSHDorA6aVZm3H_a2nUp4saqDytp7ZKJeGBiAzNn-wuXy14Yb94z6-IXffYyjXg-_gsWt8-CWGHKrqNER6aV5YaqDcTTHBLPzScb4rVA"

    idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NDY2MjEyMTQxMjQ4NzUxOWJiZjhlYWQ4ZGZiYjM3ODYwMjk5ZDciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZG9jdG9yLXBhdGllbnQtYWNjZXNzIiwiYXVkIjoiZG9jdG9yLXBhdGllbnQtYWNjZXNzIiwiYXV0aF90aW1lIjoxNjE2OTAyNjQwLCJ1c2VyX2lkIjoiRnlFclZ0VnRZcVhhbUNXOFhuSGxYbXlxcTVJMiIsInN1YiI6IkZ5RXJWdFZ0WXFYYW1DVzhYbkhsWG15cXE1STIiLCJpYXQiOjE2MTY5MDI2NDEsImV4cCI6MTYxNjkwNjI0MSwiZW1haWwiOiJzZWIuZ29uemFsZXpzZy4xOTk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNlYi5nb256YWxlenNnLjE5OTlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.nqyfxTC_piL1u3Vl5bVEOMSaMHHqNc7tVJhJAb8VBClRbtcO4gKZhCweNGca6zmtuhtfRKFLycEMbCnPX9fN83bugLI4cRrgNLKn3cOS_z8eFuLtl-U9ElLRDFnvqVYb7PcczG0dSsStbNp5rCRcBzZyEBq5wbln96-sk7AjICWZkPeyC2WgMRnvjQi1QKyTaeLKTyxLB4m8l2qc5A8BukUPwBfJ5ZAXhyeMXrbbvXE20teIAqkRdVl8lPNch8085cHc54zulnh4HvfSBC5cqY7YBE7E1kk-eq0u8LUjoC-lthScEzGaosUvAIiIMRoiMs62pMMI_2Mvj-JKkddGiw"

    admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
        const uid = decodedToken.uid;
            // ...
        res.send(decodedToken);
    })
    .catch((error) => {
        res.send("error");
        // Handle error
    });

})

app.get('/UpdateRegiment', (req, res) => {


    //Verify Token Function
    if (!verifyToken(req.body.token))
    {
        res.send("Google token not found")
    }
    else if (!checkUser(req.body.googleID))
    {
        res.send("User not found in patient database")
    }
    else
    {
        res.send("Big regiment object to be determined")
    }
    
})

function verifyToken(loginToken)
{
    
    //Check Token valid through google API
    //return true/false
    return true;
}

function checkUser(googleId)
{
    //Query the database if we have a user with that google ID
    //return true/false
    return true;
}

function getPatientData(googleId)
{
    /// return ????
}

app.get('/getRegiment', (req, res) => {

    //Verify Token Function
    if (!verifyToken(req.body.token))
    {
        res.send("Google token not found")
    }
    else if (!checkUser(req.body.googleID))
    {
        res.send("User not found in patient database")
    }
    else
    {
        res.send(getPatientRegiment(req.body.googleId))
    }
})

function getPatientRegiment(googleId) {
    
    //Get Patient regiment from database
    //return patientRegiment
}

app.post('/updateRegiment', (req, res) => {

    //Verify Token Function
    if (!verifyToken(req.body.token))
    {
        res.send("Google token not found")
    }
    else if (!checkUser(req.body.googleId))
    {
        res.send("User not found in patient database")
    }
    else
    {
        updatePatientRegiment(req.body.googleId, regimentId, regimentStruct)
        res.send("Regiment has been updated")
    }
})

function updatePatientRegiment(googleId, regimentId, regimentStruct)
{
    // Update a regiment in the database module
}

app.put('/addRegiment', (req, res) => {

    //Verify Token Function
    if (!verifyToken(req.body.token))
    {
        res.send("Google token not found")
    }
    else if (!checkUser(req.body.googleID))
    {
        res.send("User not found in patient database")
    }
    else
    {
        addPatientRegiment(req.body.googleId, req.body.regimentId, req.body.regimentStruct);
        res.send("Regiment has been added");
    }
})

function addPatientRegiment(googleId, regimentId, regimentStruct)
{
    // Add a regiment in the database module
}


app.get('/getPatientInfo', (req, res) => {

    //Verify Token Function
    if (!verifyToken(req.body.token))
    {
        res.send("Google token not found")
    }
    else if (!checkUser(req.body.googleID))
    {
        res.send("User not found in patient database")
    }
    else
    {
        res.send(getPatientInfo(googleId, regimentId, regimentStruct))
    }
})

function getPatientInfo(googleId, regimentId, regimentStruct)
{
    // Add a regiment in the database module
}

app.get('/getPatientList', (req, res) => {

    //Verify Token Function
    if (!verifyToken(req.body.token))
    {
        res.send("Google token not found")
    }
    else if (!checkUser(req.body.googleID))
    {
        res.send("User not found in patient database")
    }
    else
    {
        res.send(getPatientList())
    }
})

function getPatientList()
{
    //return patient list to doctor
}

app.put('/addPatient', (req, res) => {

    //Verify Token Function
    if (!verifyToken(req.body.token))
    {
        res.send("Google token not found")
    }
    else if (!checkUser(req.body.googleID))
    {
        res.send("User not found in patient database")
    }
    else
    {
        addPatient(req.body.patient)
        res.send("Patient has been added")
    }
})

function addPatient(patientStruct)
{
    //Add patient to database
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
