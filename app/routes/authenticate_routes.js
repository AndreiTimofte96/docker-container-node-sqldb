module.exports = (() => {
  'use strict';
  // const jwt = require('jsonwebtoken');
  const { getUser, newUser } = require('../actions/user_actions');

  const authenticate = (req, res) => {
    const { body } = req;
    const { mail, password } = body;

    getUser({ mail, password }).then((user) => {
      console.log(user);
      res.json({ success: true });
    }).catch((e) => {
      console.log(e);
    });
  };


  const register = (req, res) => {
    const { body } = req;
    const { userName, fullName, mail, password } = body;

    newUser({ userName, mail, password, fullName }).then((newUser) => {
      console.log(newUser);
      res.json({ success: true });
    }).catch((e) => {
      console.log(e);
    });
  };

  return {
    authenticate,
    register
  };
})();
