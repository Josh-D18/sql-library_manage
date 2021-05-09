var express = require('express');
var router = express.Router();
const { Book } = require('../models');


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.redirect('/books')
});

router.get('/books', async (req, res, next)=>{
  const books = await Book.findAll();
  res.render('index', { books })
})

router.get('/books/new', async (req, res, next)=>{
  res.render('new-book')
})

router.post('/books/new', async (req, res, next)=>{

})

router.get('/books/:id', async (req, res, next)=>{

})

router.post('/books/:id', async (req, res, next)=>{

})

router.post('/books/:id/delete', async (req, res, next)=>{

})

module.exports = router;
