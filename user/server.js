import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:A4kpAfzKBXD7jf93@re-up.boarpfr.mongodb.net/reUp', { useNewUrlParser: true, useUnifiedTopology: true });


// Create a schema for the user
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  customerType: String,
  address: String
});

// Create a model from the schema
const User = mongoose.model('Customer', userSchema, 'Customers');

// Signup route
app.post('/signup', async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('Email already in use');
    }

    // Create a new user if email not found
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send('User created');
  } catch (error) {
    console.error('Signup error:', error.message); 
    res.status(500).send('Error creating user');
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Here you should check the password. 
    // For simplicity, this example assumes passwords are stored in plain text,
    // which is not secure. Use hashed passwords in a real application.
    if (user.password !== password) {
      return res.status(401).send('Invalid password');
    }

    res.status(200).send({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send('Error logging in');
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});