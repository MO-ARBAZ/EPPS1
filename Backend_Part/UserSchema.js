const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to your MongoDB using Mongoose
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose Schemas and Models
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
});

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  product: String,
  amount: Number,
});

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);

app.get('/users-with-orders', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'userId',
          as: 'orders',
        },
      },
      {
        $unwind: '$orders',
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $match: { totalOrders: { $gte: 2 } },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          totalOrders: 1,
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
