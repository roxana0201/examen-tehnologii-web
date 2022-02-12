const BookDB=require('../models').Book;

const express = require("express");


const controller = {
    addBook: async (req, res) => {
        const book = {
            title:req.body.title,
            url:req.body.url,
            genre:req.body.genre,
            virtualshelfId:req.body.virtualshelfId
        }
        let err=false;
        let errArr=[];

        if(book.title.length<=5) {
            errArr.push("Name must be at least 5 characters long\n")
            err=true;
        }
        if(book.genre!=="COMEDY" && book.genre!=="TRAGEDY" && book.genre!=="STORY") {
            errArr.push("genre must be from the list\n")
            err=true;
        }
        if(!err) {
            try {
                const newBook=await BookDB.create(book);
                res.status(200).send("Book added");
            }
            catch (error) {
                console.log('Error:',error);
                res.status(500).send("Error creating new book!");
            }
        }
        else {
            res.status(400).send({message:errArr})

        }
    },
    getAllBooks: async(req, res) => {
        try {
            let books=await BookDB.findAll();
            res.status(200).send(books);
        } catch(err){
            res.status(500).send({
                message: "Error selecting all books!"
            })
        }
    },
    getBooks: async(req, res) => {
        try{
            let bookId = req.params['id'];
            const book = await BookDB.findAll({ where : { virtualshelfId: bookId }});
            res.status(200).send(book);
        } catch(err){
            res.status(500).send({
                message: "Error selecting Books!"
            })
        }
    },

    updateBook: async(req, res) => {
        let bookId=req.params['id'];
        const book=await BookDB.findOne({where:{id:bookId}});
        book.update({
            title:req.body.title,
            url:req.body.url,
            genre:req.body.genre,
            virtualshelfId:req.body.virtualshelfId
        })
            .then(() => {
                res.status(200).send({message:"Edited book"})
            })
            .catch(() => {
                res.status(500).send({message:"Error"})
            })
    },
    deleteBook : async(req, res) => {
        try{
            let bookId = req.params['id'];
            const book = await BookDB.destroy({
                where: {
                    id: bookId
                }
            })
            res.status(200).send({
                message: "book " + bookId + " deleted."
            });
        }catch(error){
            res.status(500).send({
                message: "Error deleting Book!"
            })
        }
    }
}

module.exports = controller;