var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
	name: String,
	image: String,
	mrp: Number,
	price: Number,
	stripe_price_id: String,
	stripe_product_id: String,
	disc_perc: Number,
	discount: Number,
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Review"
		}
	]
});

module.exports = mongoose.model('Product',productSchema);