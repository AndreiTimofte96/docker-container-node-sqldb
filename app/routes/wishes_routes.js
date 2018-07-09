module.exports = (() => {
  'use strict';


  const { addWish_action, allWishes_action, editWish_action, changeStatus_action } = require('../actions/wishes_actions');

  const addWish = (req, res) => {
    const { body } = req;
    const { wish_text, amount, added_on } = body;
    const user_id = req.decoded.user.id;

    addWish_action({
      wish_text,
      amount,
      added_on,
      user_id
    }).then(() => {
      res.json({ success: true, message: 'Wish added!' });
    });
  };

  const allWishes = (req, res) => {
    const { id } = req.decoded.user;

    allWishes_action({
      id
    }).then((wishes) => {
      res.json({ success: true, wishes });
    });
  };

  const editWish = (req, res) => {
    const { body } = req;
    const { wish_id, wish_text } = body;
    const { amount, added_on } = body;

    const { id } = req.decoded.user;

    editWish_action({
      wish_id,
      wish_text,
      amount,
      added_on,
      id
    }).then(() => {
      res.json({ success: true, message: 'Wish updated successfully!' });
    });
  };


  const changeStatus = (req, res) => {
    const { body } = req;
    const { wish_id, status } = body;
    const { id } = req.decoded.user;

    changeStatus_action({
      wish_id,
      status,
      id
    }).then((response) => {
      res.json(response);
    });
  };

  return {
    addWish,
    allWishes,
    editWish,
    changeStatus
  };
})();
