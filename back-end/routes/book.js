const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

router.post('/book',bookController.addBook);
router.get('/book',bookController.getAllBooks);
router.get('/book/:id',bookController.getBooks);
router.put('/book/:id',bookController.updateBook);
router.delete('/book/:id',bookController.deleteBook);

module.exports = router;