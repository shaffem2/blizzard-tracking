const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql')
const bodyparser = require('body-parser')

app.use(morgan('short'));
app.use(bodyparser.urlencoded({extended: false}));

app.use(express.static('./public'));

function getConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'badminano',
        password: 'testpw',
        database: 'blizzardtestbd'
    })
}

/*
var firstName
var lastName
app.post('/user_create', (req, res) => {
    console.log("Trying to create a new user")

    firstName = req.body.create_first_name;
    lastName = req.body.create_last_name;
    console.log(firstName + lastName);

    const queryString = "INSERT INTO jobs (firstname, lastname, status) VALUES (?, ?, ?)"
    getConnection().query(queryString, [firstName, lastName, "Package opened"], (err, results, fields) => {
        if (err){
            console.log("Failed to insert new user: " + err);
            res.sendStatus(500);
            return;
        }

        console.log("Successfully inserted user with id: " + results.insertId)
        res.send("user created");
    })

})
*/

app.get('/user/:id', (req, res) => {
    console.log("Fetching user with id " + req.params.id);

    const connection = getConnection();

    const userID = req.params.id
    const queryString = "SELECT * FROM jobs WHERE id = ?"
    connection.query(queryString, [userID], (err, rows, fields,) => {
        if (err) {
            console.log("Failed to query for users: " + err);
            res.sendStatus(500);
            return;
        }
        console.log("Fetching job from mysql");
        res.json(rows);
    })

})

app.get("/", (req, res) => {
    console.log("Responding to root route");
    res.send("Hello from Root!")
})

app.get("/users", (req, res) => {
    var user1 = {firstName: "Max", lastName:"Shaffer"}
    var user2 = {firstName: "Maddie", lastName:"Garcia"}
    res.json([user1,user2])
})

//localhost:3001
app.listen(3001, () => {
    console.log("Server is listening on port 3001...");
})