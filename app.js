const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'rds-instances.c9numfueac1h.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'fahim2017331026',
  port:'3306',
  database:"rdsDB1"
});

connection.connect((error) => {
  if (error) {
    console.error('Failed to connect to RDS database:---', error);
  } else {
    console.log('Connected to RDS database!');
  }
});

connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('Failed to fetch data from RDS database:', error);
    } else {
      console.log('Fetched data from RDS database:', results);
    }
  });

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Set up a route to serve the HTML page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  
  // Set up a route to handle button clicks
  app.get('/query', function(req, res) {
    // Perform a SELECT query on the database
    connection.query('SELECT * FROM users', function(error, results, fields) {
      if (error) throw error;
      // Send the query results back to the client as JSON
      res.json(results);
    });
  });

app.listen(80, () => {
  console.log('Server started on port 80');
});
