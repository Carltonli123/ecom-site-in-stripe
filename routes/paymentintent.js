var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var request = require('request');
const stripe = require('stripe')('sk_test_51Rh4ylR41iH2FLgRfb8AWRxkfBLRJQjOdjr0QOBSnVd4aIKXKfolPII2vbTMcrpnhlj1eBCQFA1sSkMOuPkmP5JN00zfe99mmV');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/paymentintent", bodyParser.json(), async function(req, res) {
    console.log(req.body);

    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create(req.body);
        console.log("Payment intent created:", paymentIntent);
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: "Failed to create payment intent" });
    }
});
module.exports = router;
