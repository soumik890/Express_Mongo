import express from "express";
import mongoose from "mongoose";
import Product from "./models/productModel.js";
const uri =
  "mongodb+srv://soumik890:soumik890@mongocrud-cluster.vglrtoc.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json(0));

mongoose
  .connect(uri)
  .then((res) => {
    app.listen(8000, () => {
      console.log("connected to mongo server, server runing");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("hello from express_mongo_api");
});

app.post("/getprod", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//get prod data using get request
app.get("/getprodbyget", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
app.get("/getprodbyId/:id", async (req, res) => {
  console.log("hello");
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateProd = await Product.findByIdAndUpdate(id, req.body);
    if (updateProd) {
      const updated = await Product.findById(id);
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: `item not found with id ${id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const del = await Product.findByIdAndDelete(id);

    if (del) {
      res.status(200).json(del);
    } else {
      res.status.json({ message: `item no found with id ${id}` });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
});

app.post("/product", async (req, res) => {
  //   console.log(req.body);
  //   res.send(req.body);
  try {
    const prod = await Product.create(req.body);
    res.status(200).json(prod);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "error in request from db !!", error: error });
  }
});
