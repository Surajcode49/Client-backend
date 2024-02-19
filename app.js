const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb is connected bro ");
  })
  .catch((err) => {
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: "string",
  roll: "number",
  role: "string",
});
const product = mongoose.model("collection", productSchema);

// create api

app.post("/new", async (req, res) => {
  try {
    const newProduct = await product.create(req.body);
    res.status(200).json({
      success: true,
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// READ APIS 
app.get("/read",async(req,res)=>{
  try{
      const newProduct = await product.find(req.body);
      res.status(200).json({
        success:true,
        product:newProduct,
      })
  } catch(err) {
      res.status(500).json({
        success:false,
        message: err.message,
      })

  }
})

//update apis

app.put("/up",(req,res)=>{
  try{

  }catch(err){
    
  }
})








app.listen(8080, (req, res) => {
  console.log(`server is running at ${port}`);
});
