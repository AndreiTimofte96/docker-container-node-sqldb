module.exports = (() => {
  'use strict';

  const Wish = require('../models/wish_model');

  const addWish_action = ({
    wish_text,
    amount,
    added_on,
    user_id
  }) => {

    return new Wish()
      .insert()
      .set('user_id', user_id)
      .set('wish_text', wish_text)
      .set('amount', amount)
      .set('added_on', added_on)
      .set('status', 'in_progress')
      .valueOf()
      .then(() => {
        return true;
      });
  };

  const allWishes_action = ({
    id
  }) => {

    return new Wish()
      .field('*')
      .where({ id })
      .valueOf()
      .then((response) => {
        return response;
      });
  };

  const editWish_action = ({
    wish_id,
    wish_text,
    amount,
    added_on,
    id
  }) => {

    return new Wish()
      .update()
      .set('wish_text', wish_text)
      .set('amount', amount)
      .set('added_on', added_on)
      .where({ wish_id, id })
      .valueOf()
      .then(() => {
        return true;
      });
  };

  const changeStatus_action = ({
    wish_id,
    status,
    id
  }) => {
    return new Wish()
      .update()
      .set('status', status)
      .where({ wish_id, id })
      .valueOf()
      .then((response) => {

        console.log('changeSTATUS', response);

        if (response.changedRows === 0) {

          if (response.affectedRows === 1) {
            return { success: true, message: 'Status changed successfully!' };
          }
          return { success: false, message: 'Error! This wish doesnt belong to this user!' };
        }
        return { success: true, message: 'Status changed successfully!' };
      });
  };

  return {
    addWish_action,
    allWishes_action,
    editWish_action,
    changeStatus_action
  };
})();
