const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "Final_Project";
const COLLECTION_NAME = "GardeningSupplies";

const getAllSupplies = async (req, res) => {
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

const getSingleSupply = async (req, res) => {
  const supplyId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find({ _id: supplyId });
  result.toArray((err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });
};

const createSupply = async (req, res) => {
  const supply = {
    product: req.body.product,
    quantity: req.body.quantity,
    price: req.body.price,
    supplierName: req.body.supplierName
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .insertOne(supply);

  if (response.acknowledged == true) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Failed to create supply.');
  }
};

const updateSupply = async (req, res) => {
  const supplyId = new ObjectId(req.params.id);
  const supply = req.body;
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .replaceOne({ _id: supplyId }, supply);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update supply.');
  }
};

const deleteSupply = async (req, res) => {
  const supplyId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: supplyId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to delete supply.');
  }
};

module.exports = {
  getAllSupplies,
  getSingleSupply,
  createSupply,
  updateSupply,
  deleteSupply
};
