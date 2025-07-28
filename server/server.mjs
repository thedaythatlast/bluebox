//import { createServer } from 'node:http';
import express from 'express';
import { Pool } from 'pg';



const app = express()
const hostname = '127.0.0.1';
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '<your password>',
  port: 5432,
});


//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/fetch', async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users where lower(language)=$1 ORDER BY RANDOM() LIMIT 1', [req.query.language]);
    if (result.rows[0] == null) 
    {
      res.status(404).json("(you got a blank message, perhaps this language doesn't have any message, or it doesn't even exist)");
    }
    else 
      res.json(result.rows[0]);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/submit-form', async (req, res) => {

  console.log('Form Data:', req.body); // Logs the form fields

  try {
    await pool.query('INSERT INTO users(email,submission,language,comment) VALUES($1, $2, $3, $4)', [req.body.email, req.body.submission, req.body.language, req.body.comments]);
    res.json("Done!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);''
});

