const express = require("express");
const router = express.Router();
const virtualshelfController = require("../controllers/virtualshelf");

router.post('/virtualshelf/',virtualshelfController.addVirtualshelf);
router.get('/virtualshelf',virtualshelfController.getAllVirtualshelf);
router.put('/virtualshelf/:id',virtualshelfController.updatePlaylist);
router.delete('/virtualshelf/:id',virtualshelfController.deleteVirtualshelf);

module.exports = router;