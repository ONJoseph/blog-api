import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const backendUrl = 'http://localhost:3000';

  // Function to fetch posts from the backend and update the state
  // Function to fetch posts from the backend and update the state
const fetchPosts = () => {
  fetch(`${backendUrl}/api/posts`) // Use the correct URL
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => setPosts(data))
    .catch((error) => console.error(error));
};

  useEffect(() => {
    fetchPosts(); // Fetch posts when the component mounts
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const createPost = () => {
    fetch(`${backendUrl}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setNewPost({ title: '', content: '' }); // Clear the form
        fetchPosts(); // Fetch posts again to update the list
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h1>CodesBlog</h1>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={createPost}>
              Create Post
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Blog Posts</h2>
          {posts.map((post) => (
            <Card key={post.id} className="mb-3">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;


/*
This code is a React component named App that represents a simple blog application. Let's break down the code step by step:

Importing React and React Bootstrap components:
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
This code imports the necessary modules from React and React Bootstrap to create and style the user interface.

Component function definition:
function App() {
  // ...
}
This is a functional component named App. It represents the main part of your application.

State variables:
const [posts, setPosts] = useState([]);
const [newPost, setNewPost] = useState({ title: '', content: '' });
The useState hook is used to define two state variables: posts and newPost.

posts is an array that will store the blog posts fetched from the backend.
newPost is an object with title and content properties, which represents the data for creating a new blog post.
Backend URL:
const backendUrl = 'http://localhost:3000';
This variable holds the URL of your backend server. The frontend will use this URL to make requests to the backend.

fetchPosts function:
const fetchPosts = () => {
  // ...
};
This function is responsible for fetching blog posts from the backend server. It uses the fetch API to make an HTTP GET request to the /api/posts endpoint on the backend. If the request is successful, it updates the posts state with the retrieved data.

useEffect hook:
useEffect(() => {
  fetchPosts(); // Fetch posts when the component mounts
}, []);
The useEffect hook is used to execute the fetchPosts function when the component is first mounted. The empty dependency array [] ensures that this effect runs only once, equivalent to the componentDidMount lifecycle method in class components.

handleInputChange function:
const handleInputChange = (e) => {
  // ...
};
This function handles changes in the form input fields. It updates the newPost state based on the user's input.

createPost function:
const createPost = () => {
  // ...
};
This function sends a POST request to the backend with the data from newPost when the "Create Post" button is clicked. If the request is successful, it clears the form and fetches the updated list of posts.

Rendered JSX:
The JSX code within the return statement defines the structure and content of your application's user interface. It includes form elements for creating a new post and displays a list of existing posts.

Form.Control elements are used for input fields.
The "Create Post" button triggers the createPost function when clicked.
The list of blog posts is displayed in a Bootstrap Card component.
Overall, this code represents a basic blog application that allows users to create new blog posts and view existing ones. The data is fetched from and sent to a backend server using HTTP requests.
*/
