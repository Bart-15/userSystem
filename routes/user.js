const express = require('express');

const router = express.Router();

router.post('/api/signup', async (req, res) => {
    res.json("Hello po")
})


module.exports = router;