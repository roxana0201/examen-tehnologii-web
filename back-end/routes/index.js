const express = require('express')
const router = express.Router();
const otherRouter = require('./other')
const bookRouter = require('./book');
const virtualshelfRouter=require('./virtualshelf');

if(process.env.NODE_ENV !== 'production') {
    router.use('/', otherRouter);
}
router.use('/', bookRouter);
router.use('/',virtualshelfRouter);

module.exports = router