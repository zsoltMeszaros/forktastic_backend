const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
	res.send(`recipe json with id: ${req.params.id}`);
});

module.exports = router;
