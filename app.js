const express = require('express');


const chalk = require('chalk'); // pt colorare mesaje
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // afiseaza ce req sunt facute


const app = express();
const PORT = process.env.PORT || 3000;

const { singleBook, allBooks } = require('./app/routes/book_routes');
const { authenticate, register } = require('./app/routes/authenticate_routes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/books', allBooks);
app.get('/books/:id', singleBook);
app.post('/authenticate', authenticate);
app.post('/register', register);

app.get('/', (req, res) => {
  res.send('HELLO');
});


app.listen(PORT, () => {
  debug(`listening at port ${chalk.green(PORT)}`);
});
