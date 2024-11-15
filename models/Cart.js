const mongoose = require("mongoose");

// cart schema
const cartSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true,
  },
  products: [
    {
      productId: String,
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});
module.exports = mongoose.model("Cart", cartSchema);
