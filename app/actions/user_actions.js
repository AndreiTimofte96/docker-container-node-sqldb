module.exports = (() => {
  'use strict';

  const User = require('../models/user_model');

  const newUser = ({
    userName,
    mail,
    password
  }) => {
    
    return new User()
      .insert()
      .set('password', password)
      .set('mail', mail)
      .set('userName', userName)
      .valueOf()
      .then(() => {
        return true;
      });
  };

  const getUser = ({
    id,
    password,
    mail
  }) => {

    if (id) {
      return new User()
        .field('*')
        .where({
          id
        })
        .valueOf()
        .then((res) => {
          return res[0];
        });
    }

    return new User()
      .field('*')
      .where({
        mail,
        password
      }).valueOf()
      .then((res) => {

        console.log("RES", res);
        console.log(res.length);
        if (res.length > 1)
          return null;
        return res[0];
      });
  };

  return {
    newUser,
    getUser
  };
})();
