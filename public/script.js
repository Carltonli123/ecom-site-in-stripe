function createPaymentLink(order) {
    // show order information in console
    console.log("order information:", order);   

    var line_items = []

    for (const item of order.checkoutCart.items) {
             console.log("item:", item.product.stripe_price_id);
             line_items.push({
                 price: item.product.stripe_price_id,
                 quantity: item.qty
             });
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
                 line_items        
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:3000/paymentlink", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        console.log(result);
        window.location.replace(JSON.parse(result).url);
    })
    .catch((error) => console.error(error));
    


}

function createHostedCheckout(order) {
    // show order information in console
    console.log("order information:", order);   

    var line_items = []

    for (const item of order.checkoutCart.items) {
             console.log("item:", item.product.stripe_price_id);
             line_items.push({
                 price: item.product.stripe_price_id,
                 quantity: item.qty
             });
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
                 line_items,
                 discounts: [{
                     coupon: 'SrWFy9BP'
                 }],
                //  allow_promotion_codes: true,
                 mode: 'payment',
                 success_url: 'http://localhost:3000/hostedCheckoutPages/success.html',
                 cancel_url: 'http://localhost:3000/hostedCheckoutPages/cancel.html',
                 payment_intent_data: {
                     application_fee_amount: 500,
                     transfer_data: {
                         destination: 'acct_1RjKNTR1TrtJD0bV',
                     },
                 },
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:3000/checkoutsession", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        console.log("this is the session result: ");
        console.log(JSON.parse(result));
        window.location.replace(JSON.parse(result).session.url);
    })
    .catch((error) => console.error(error));
}

