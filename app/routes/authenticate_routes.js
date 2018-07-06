module.exports = (() => {
  'use strict';
  const jwt = require('jsonwebtoken');
  const { secret } = require('../../config/config');
  const { getUser, newUser } = require('../actions/user_actions');


  const checkAuthenticated = (req, res, next) => {
    const token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, secret, function (err, decoded) {
        console.log('decoded', decoded);
        if (err) {
          return res.json({ success: false, message: 'Token invalid' });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Nu exista un token'
      });
    }
  };

  const authenticate = (req, res) => {
    const { body } = req;
    const { mail, password } = body;

    getUser({ mail, password }).then((user) => {
      console.log(user);
      if (user) {
        const token = jwt.sign({ user }, secret, {
          expiresIn: 86400
        });

        res.json({
          success: true,
          message: 'Token provided!',
          token
        });
      } else {
        res.json({ success: false, message: 'Autentificare esuata. Utilizator/parola invalida' });
      }
    }).catch((e) => {
      console.log(e);
    });
  };


  const register = (req, res) => {
    const { body } = req;
    const { mail, password, userName } = body;

    newUser({
      userName,
      mail,
      password
    }).then((user) => {
      console.log('THIS IS USER:', user);
      res.json({
        success: true, message: 'Utilizator creat cu succes!'
      });
    }).catch((e) => {
      console.log(e);
      res.json({ success: false, message: 'Mailul exista deja!' });
    });
  };

  return {
    authenticate,
    register,
    checkAuthenticated
  };
})();
