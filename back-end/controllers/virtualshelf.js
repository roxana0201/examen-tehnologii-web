const VirtualshelfDB=require('../models').Virtualshelf;

const express = require("express");


const controller = {
    addVirtualshelf: async (req, res) => {
        const virtualshelf = {
            description: req.body.description,
            date:req.body.date,
        }
        let err = false;
        let errArr=[];

        if(virtualshelf.description.length<=3) {
            err=true;
            errArr.push("Name must be at least 3 characters long\n");
        }

        if(!err) {
            try {
                const newVirtualshelf=await VirtualshelfDB.create(virtualshelf);
                res.status(200).send("Virtualshelf added");
            }
            catch (error) {
                console.log('Error:',error);
                res.status(500).send("Error creating new virtualshelf!");
            }
        }
        else {

            res.status(400).send({message:errArr})
        }
    },
    getAllVirtualshelf: async(req, res) => {
        try {
            let playlists=await VirtualshelfDB.findAll();
            res.status(200).send(playlists);
        } catch(err){
            res.status(500).send({
                message: "Error selecting all spacecrafts!"
            })
        }
    },

    updatePlaylist: async(req, res) => {
        let virtualshelfId=req.params['id'];
        const virtualshelf=await VirtualshelfDB.findOne({where:{id:virtualshelfId}});
        virtualshelf.update({
            description: req.body.description,
            date:req.body.date
        })
            .then(() => {
                res.status(200).send({message:"Edited virtualshelf"})
            })
            .catch(() => {
                res.status(500).send({message:"Error"})
            })
    },
    deleteVirtualshelf : async(req, res) => {
        try{
            let virtualshelfId = req.params['id'];
            const playlist = await VirtualshelfDB.destroy({
                where: {
                    id: virtualshelfId
                }
            })
            res.status(200).send({
                message: "Virtual shelf " + virtualshelfId + " deleted."
            });
        }catch(error){
            res.status(500).send({
                message: "Error deleting virtual shelf!"
            })
        }
    }

}

module.exports = controller;