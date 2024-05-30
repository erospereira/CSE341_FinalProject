const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "Final_Project";
const COLLECTION_NAME = "Users";

const getAllUsers = async (req, res) => {
  console.log("GETALLUSERS");
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find();
  console.log("result: " + JSON.stringify(result));


  console.log("mongodb: " + mongodb);
  
  console.log("sldkfj: " + (await mongodb.getDatabase())[0]
  )
  // Object.entries(((await mongodb.getDatabase()
  //   .db(DATABASE).listCollections())[0])).forEach(([key,val]) => {
  //     console.log("kay: " + key + " value: " + val);
  //   });
  
  result.toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });

  // .then((users) => {
  //   res.setHeader('Content-Type', 'application/json');
  // res.status(200).json(users);
  // });
};

const getSingleUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find({ _id: userId });
  result.toArray((err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });

  // .then((users) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(users[0]);
  // });
};

const createUser = async (req, res) => {
  const user = {
    "first name": req.body['first name'],
    "last name": req.body['last name'],
    email: req.body.email,
    gender: req.body.gender,
    birthday: req.body.birthday,
    address: req.body.address,
    phone: req.body.phone

  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .insertOne(user);

  console.log('response: ' + JSON.stringify(response));
  if (response.acknowledged == true) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Failed to create user.');
  }
};
const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body['first name'],
    lastName: req.body['last name'],
    email: req.body.email,
    gender: req.body.gender,
    birthday: req.body.birthday,
    address: req.body.address,
    phone: req.body.phone
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .replaceOne({ _id: userId }, user);
  console.log('response: ' + JSON.stringify(response));
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update user.');
  }
};
const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: userId });
  console.log('response: ' + JSON.stringify(response));
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update user.');
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};
