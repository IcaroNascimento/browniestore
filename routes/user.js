const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
	response.send('Hello from node');
});

module.exports = router;
