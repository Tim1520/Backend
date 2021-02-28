const express = require('express');


const app = express();

app.use(express.json());

const port = 8081;    //8081 placeholder

// var loginToken = "placeholder";
// var googleid = "12345";

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
