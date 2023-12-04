import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

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
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user._id },
      'secretKey', // 비밀키 (실제 서비스에서는 보안을 위해 복잡한 키 사용)
      { expiresIn: '1h' } // 토큰 유효시간 설정
    );

    res.status(200).send({ success: true, token });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send('Error logging in');
  }
});


// Inventory function
const inventorySchema = new mongoose.Schema({
  productName: String,
  quantity: Number,
  productType: String,
  price: Number,
  brandName: String,
  productImage: String // This will store the path to the image
});

const Inventory = mongoose.model('Inventory', inventorySchema);

// Configure multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Inventory route
app.post('/inventory', upload.single('productImage'), async (req, res) => {
  try {
    const newInventoryItem = new Inventory({
      productName: req.body.productName,
      quantity: req.body.quantity,
      productType: req.body.productType,
      price: req.body.price,
      brandName: req.body.brandName,
      productImage: req.file.path // Storing the path of the uploaded file
    });

    await newInventoryItem.save();
    res.status(201).send('Inventory item added');
  } catch (error) {
    console.error('Inventory add error:', error.message);
    console.error(error.stack); // Log the error stack for more details
    res.status(500).send('Error adding inventory item');
  }
});


// search Function
// Search route for inventory items
app.get('/search', async (req, res) => {
  try {
    let query = {};
    if (req.query.productName) {
      query.productName = { $regex: req.query.productName, $options: 'i' };
    }
    // Add other query parameters if needed

    const inventoryItems = await Inventory.find(query);
    res.status(200).send(inventoryItems);
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).send('Error searching inventory items');
  }
});



// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});