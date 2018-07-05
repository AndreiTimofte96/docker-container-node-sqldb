module.exports = (() => {
  'use strict';

  const User = require('../models/user_model');

  const newUser = ({ userName, fullName, mail, password }) => {
    return new User()
      .insert()
      .set('password', password)
      .set('mail', mail)
      .set('userName', userName)
      .set('fullName', fullName)
      .valueOf()
      .then(() => {
        return true;
      });
  };

  return {
    newUser
  };
})();
