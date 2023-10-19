const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Use the CORS middleware to allow cross-origin requests

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  password: '2023',
  host: 'localhost',
  database: 'codesblogdb',
  port: 5432,
});

// Routes

// Create a new blog post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const query = 'INSERT INTO blog_posts (title, content) VALUES ($1, $2) RETURNING *';
    const values = [title, content];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all blog posts
app.get('/api/posts', async (req, res) => {
  try {
    const query = 'SELECT * FROM blog_posts';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific blog post by ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const query = 'SELECT * FROM blog_posts WHERE id = $1';
    const values = [postId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a blog post by ID
app.put('/api/posts/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const query = 'UPDATE blog_posts SET title = $1, content = $2 WHERE id = $3 RETURNING *';
    const values = [title, content, postId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a blog post by ID
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const query = 'DELETE FROM blog_posts WHERE id = $1 RETURNING *';
    const values = [postId];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


/*
This code represents a basic Node.js server using the Express framework to create a RESTful API for a blog application. Let's break down the code step by step:

Importing Required Modules:

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
express: This module is the core of the Express.js web application framework.
body-parser: This middleware is used to parse the request body.
Pool from pg: This is used to create a PostgreSQL connection pool.
cors: This middleware is used to handle Cross-Origin Resource Sharing (CORS) headers.
Creating the Express Application:

const app = express();
An Express application is created and stored in the app variable.

Configuring Middleware:

app.use(bodyParser.json());
app.use(cors());
bodyParser.json(): This middleware parses incoming JSON data and makes it available in req.body.
cors(): This middleware handles CORS headers, allowing cross-origin requests.
Creating a PostgreSQL Connection Pool:

const pool = new Pool({
  user: 'postgres',
  password: '2023',
  host: 'localhost',
  database: 'codesblogdb',
  port: 5432,
});
This code creates a PostgreSQL connection pool using the pg library. The pool is configured with the database credentials, host, and port number.

Defining API Routes:

The code defines several routes for different CRUD (Create, Read, Update, Delete) operations on blog posts. These routes are defined using HTTP methods (POST, GET, PUT, DELETE) and handle various tasks related to managing blog posts.

POST /api/posts: Create a new blog post.
GET /api/posts: Get a list of all blog posts.
GET /api/posts/:id: Get a specific blog post by ID.
PUT /api/posts/:id: Update a blog post by ID.
DELETE /api/posts/:id: Delete a blog post by ID.
Each route uses asynchronous functions to handle the database operations (insert, select, update, delete) and responds with appropriate JSON data or error messages.

Starting the Express Server:

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
This code starts the Express server on the specified port (in this case, port 3000) and logs a message indicating that the server is running.

In summary, this code sets up an Express server with a PostgreSQL database connection pool to create a RESTful API for managing blog posts. It defines routes for various CRUD operations and uses middleware to handle JSON parsing and CORS headers. This server can be used as the backend for a blog application to handle data storage and retrieval.
*/
