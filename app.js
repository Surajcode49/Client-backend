const express = require("express");
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // <-- Missing parentheses

mongoose
  .connect("mongodb://localhost:27017/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo is connected bro don't worry bro ");
  })
  .catch((err) => {
    console.log(err);
  });

// Define the schema for products
const productSchema = new mongoose.Schema({
  name: String, // <-- Corrected type definitions
  number: Number,
  gender: String,
});

// Create a model based on the schema
const Product = mongoose.model("Product", productSchema);

app.post("/new", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body); // <-- Use Product model to create a new product
    res.status(200).json({
      success: true,
      product: newProduct, // <-- Return the newly created product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// create a api for the read the data

app.get("/read", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products, // Sending retrieved products in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// api for update the data

app.put("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: true, // Corrected option name
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete api

app.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Product is deleted from the database",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(5000, () => {
  // <-- Use 'port' variable instead of hardcoding port number
  console.log(`server is running bro ${port}`);
});
