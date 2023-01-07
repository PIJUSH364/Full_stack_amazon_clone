const crypto = require('crypto');
const Razorpay = require('razorpay');

// Razorpay instance create
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// provide razorpay api_key
const razorpayKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
};

// checkout controller
const checkOut = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: 'INR',
  };

  const order = await instance.orders.create(options, (err, order) => {
    if (err) {
      res.status(400).json({
        success: false,
      });
    } else {
      res.status(200).json({
        success: true,
        order,
      });
    }
  });
};

// payment controller
const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest('hex');
  console.log('sig received ', razorpay_signature);
  console.log('sig generated ', expectedSignature);
  const isAuthentic = razorpay_signature === expectedSignature;
  if (isAuthentic) {
    // step1:save payment information on data base

    // step2: redirect to payment status page with payment reference id
    res.redirect(
      `http://localhost:5173/paymentStatus?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: failed,
    });
  }
};

module.exports = { razorpayKey, checkOut, paymentVerification };
