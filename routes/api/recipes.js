const express = require('express');
const router = express.Router();
const verify = require('../verifyToken');


router.get('/:id', verify, (req, res) => {
	res.send(`recipe json with id: ${req.params.id}`);
});


module.exports = router;
