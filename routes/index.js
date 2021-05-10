var express = require('express');
var router = express.Router();
const { Book } = require('../models');


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.redirect('/books')
});

router.get('/books', async (req, res, next)=>{
  const books = await Book.findAll();
  res.render('index', { books : books })
})

router.get('/books/new', async (req, res, next)=>{
  res.render('new-book')
})

router.post('/books/new', async (req, res, next)=>{
  const book = await Book.create(req.body);
  res.redirect('/books/' + book.id);
})

router.get('/books/:id', async (req, res, next)=>{
  const book = await Book.findByPk(req.params.id);
  res.render("book-detail", { book : book });
})

// Get Edit Form
router.get('/books/:id/edit', async (req, res, next)=>{
  const book = await Book.findByPk(req.params.id);
  res.render("update-book", { book : book });
})

router.post('/books/:id', async (req, res, next)=>{
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/')
})

router.post('/books/:id/delete', async (req, res, next)=>{
  const book = await Book.findByPk(req.params.id);
  book.destroy();
  res.redirect('/');
})

module.exports = router;
