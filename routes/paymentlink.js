var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var request = require('request');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/paymentlink", function(req, res) {
    console.log(req.body);
    const stripe = require('stripe')('sk_test_51Rh4ylR41iH2FLgRfb8AWRxkfBLRJQjOdjr0QOBSnVd4aIKXKfolPII2vbTMcrpnhlj1eBCQFA1sSkMOuPkmP5JN00zfe99mmV');

    async function createPaymentLink() {
        var requestBody = req.body;
        requestBody.after_completion = {
            type: 'redirect',
            redirect: {
                url: 'http://localhost:3000/completed'
            }
        };
        try {
            const paymentLink = await stripe.paymentLinks.create(req.body);
            res.status(200).json({ url: paymentLink.url });
          
        } catch (error) {
            console.error("Error creating payment link:", error);
            res.status(500).json({ error: "Failed to create payment link" });
        }
    }

    createPaymentLink()

// the end
})

module.exports = router;