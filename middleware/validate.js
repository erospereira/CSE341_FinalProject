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





module.exports = {
  user
};
