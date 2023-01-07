const express = require('express');
const { razorpayKey, checkOut, paymentVerification } = require('../controller/paymentController');

const router = express.Router();

// checkout route
router.route('/checkout').post(checkOut);

router.route('/payment_verification').post(paymentVerification);

router.route('/getKey').get(razorpayKey);

module.exports = router;
