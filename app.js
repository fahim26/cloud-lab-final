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

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // Perform a SELECT query on the database
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error('Failed to fetch data from RDS database:', error);
      res.status(500).send('Failed to fetch data from RDS database');
    } else {
      console.log('Fetched data from RDS database:', results);
      // Send the query results back to the client as HTML table
      const tableRows = results.map(result => `<tr><td>${result.ID}</td><td>${result.NAME}</td><td>${result.AGE}</td><td>${result.INCOME}</td><td>${result.NUMBER}</td></tr>`).join('');
      const html = `
        <html>
          <head>
            <title>Query Results</title>
            <style>
              table {
                border-collapse: collapse;
                width: 100%;
              }
              th, td {
                text-align: left;
                padding: 8px;
                border: 1px solid #ddd;
              }
              th {
                background-color: #4CAF50;
                color: white;
              }
              tr:nth-child(even) {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h1>Query Results</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </body>
        </html>
      `;
      res.send(html);
    }
  });
});

app.listen(80, () => {
  console.log('Server started on port 80');
});
