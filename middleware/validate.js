const validator = require('../helpers/validate');

const user = (req, res, next) => {
  const validationRule = {
    "first name": 'required|string',
    "last name": 'required|string',
    email: 'required|email',
    gender: 'required|string',
    birthday: 'string',
    address: 'string',
    phone: 'string'
  };
 

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
const plant = (req, res, next) => {
  const validationRule = {
    name: 'required|string'
   
  };
 

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const order = (req, res, next) => {
  const validationRule = {
    orderNumber: 'required|string',
    date: 'required|string',
    products: 'array',
    user_id: 'required|string',
  
  };
 

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const gerdeningSupplies = (req, res, next) => {
  const validationRule = {
    product: 'required|string',
    price: 'required|string',
    supplierName: 'required|string',
  
  };
 

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};



module.exports = {
  user,
  plant,
  order,
  gerdeningSupplies
};
