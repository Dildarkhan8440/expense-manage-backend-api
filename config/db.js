import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Create a connection to the MySQL database
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     return;
//   }
//   console.log('Connected to the database');
// });
const db = mysql.createConnection({
  host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

export default db;