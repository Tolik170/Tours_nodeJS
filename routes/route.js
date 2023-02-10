const express = require('express');

const user = require('./userRoutes');
const auth = require('./authRoutes');
const tour = require('./tourRoutes');

const router = express.Router();

router.use('/users', user);
router.use('/auth', auth);
router.use('/tours', tour);

module.exports = router;
