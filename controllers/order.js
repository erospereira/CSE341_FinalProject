const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "Final_Project";
const COLLECTION_NAME = "Orders";

const getAllOrders = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find();

  result.toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleOrder = async (req, res) => {
  const orderId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find({ _id: orderId });
  result.toArray((err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });
};

const createOrder = async (req, res) => {
  const order = {
    orderNumber: req.body.orderNumber,
    date: req.body.date,
    products: req.body.products,
    customerName: req.body.customerName,
    totalPrice: req.body.totalPrice
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .insertOne(order);

  if (response.acknowledged == true) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Failed to create order.');
  }
};

const updateOrder = async (req, res) => {
  const orderId = new ObjectId(req.params.id);
  const order = req.body;
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .replaceOne({ _id: orderId }, order);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update order.');
  }
};

const deleteOrder = async (req, res) => {
  const orderId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: orderId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to delete order.');
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder
};
