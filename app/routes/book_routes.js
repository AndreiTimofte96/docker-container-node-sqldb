const express = require('express');
const bookRouter = express.Router();

const books = [
  {
    id: 1,
    a: 1,
    b: 2
  },
  {
    id: 2,
    a: 3,
    b: 4
  }
];


const allBooks = (req, res) => {
  console.log('allBooks');
  res.json({ books });
};

const singleBook = (req, res) => {

  console.log('singleBook');
  const id = JSON.parse(req.params.id);

  for (let index = 0; index < books.length; index++) {


    if (books[index].id === id) {
      console.log('EGALE');
      res.json({ book: books[index] });
      return;
    }
  }

  res.json({ msg: 'book not found' });
};

module.exports = ({ singleBook, allBooks });
