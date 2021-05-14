var express = require('express');
var router = express.Router();
const { Book } = require('../models');

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      next(error);
    }
  }


}
/* Redirect to home page. */
router.get('/', async function(req, res, next) {
  res.redirect('/books')
});

/* GET home page */
router.get('/books', async (req, res, next)=>{
  const books = await Book.findAll();
  res.render('index', { books : books })
})

/* GET add new book form page */
router.get('/books/new', async (req, res, next)=>{
  res.render('new-book')
})

/* Add new book to database */
router.post('/books/new', async (req, res, next)=>{
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/");
  } catch (error) {
    if(error.name === "SequelizeValidationError") { 
      book = await Book.build(req.body);
      res.render("new-book", { book, errors: error.errors })
    } else {  
      throw error;
    }  
  }
})

/* GET a single Book  */
router.get('/books/:id', asyncHandler(async (req, res, next)=>{
  const book = await Book.findByPk(req.params.id);
  if (book){
    res.render("book-detail", { book : book });
  } else{
    next();
  } 
}))

/* Render Edit Book Page */
router.get('/books/:id/edit', asyncHandler(async (req, res, next)=>{
  const book = await Book.findByPk(req.params.id);
  if (book){
    res.render("update-book", { book : book });
  } else{
    res.sendStatus(404)
  }
}))

/* Update a Book */
router.post('/books/:id/edit', asyncHandler(async (req, res, next)=>{
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.update(req.body);
    res.redirect("/"); 
  } else {
    res.sendStatus(404);
  }
}))

/* Render Delete Book Page */
router.get('/:id/delete',  asyncHandler(async (req, res, next)=>{
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("delete-book", { book : book });
  } else {
    res.sendStatus(404);
  }
}))

/* Delete Book  */
router.post('/books/:id/delete',  asyncHandler(async (req, res, next)=>{
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
}))

module.exports = router;
