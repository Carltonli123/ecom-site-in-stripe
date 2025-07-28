var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var request = require('request');
const stripe = require('stripe')('sk_test_51Rh4ylR41iH2FLgRfb8AWRxkfBLRJQjOdjr0QOBSnVd4aIKXKfolPII2vbTMcrpnhlj1eBCQFA1sSkMOuPkmP5JN00zfe99mmV');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/checkoutsession", function(req, res) {
    console.log(req.body);

    async function createCheckoutSession() {
        try {
            const session = await stripe.checkout.sessions.create(req.body);
            console.log("Checkout session created:", session);
            res.status(200).json({ session });
        } catch (error) {
            console.error("Error creating checkout session:", error);
            res.status(500).json({ error: "Failed to create checkout session" });
        }
    }

    createCheckoutSession() 
       


});


router.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

router.get("/session-status-component", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id, {expand: ["payment_intent"]});

   res.send({
    status: session.status,
    payment_status: session.payment_status,
    payment_intent_id: session.payment_intent.id,
    payment_intent_status: session.payment_intent.status
  });
});


module.exports = router;