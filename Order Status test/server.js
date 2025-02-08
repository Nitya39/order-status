const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Tyler:designify@cluster0.zbvbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: String,
  product: String,
  price: String,
  paymentType: String,
  orderStatus: String,
  orderNotes: String,
  paid: Boolean,
  customerId: String,
  createdAt: Date
});

const Order = mongoose.model('Order', orderSchema);

// API to get order by ID
app.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// API to update order
app.put('/order/:orderId', async (req, res) => {
  const updates = req.body;
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { $set: updates },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve the main page (order tracking)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Serve the admin page
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});



// Na2mk2UOoD