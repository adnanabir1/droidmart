const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  const token = authorization.split(" ")[1];

  // JWT Verify
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mudgl1n.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("droidMartDB").collection("users");
    const productsCollection = client.db("droidMartDB").collection("products");
    const upcomingProductsCollection = client
      .db("droidMartDB")
      .collection("upcomingProducts");

    // JWT VERIFIED
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: "1hr",
      });
      res.send(token);
    });

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const filter = { email: email };
      const user = await usersCollection.findOne(filter);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbiden access" });
      }
      next();
    };

    app.get("/users/user/:email", async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ user: false });
      }
      const filter = { email: email };
      const user = await usersCollection.findOne(filter);
      const result = { user: user?.role === "user" };
      res.send(result);
    });

    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }
      const filter = { email: email };
      const user = await usersCollection.findOne(filter);
      const result = { user: user?.role === "admin" };
      res.send(result);
    });

    app.post("/user", async (req, res) => {
      const userData = req.body;
      console.log(userData);
      const filter = { email: userData.email };
      const existingUser = await usersCollection.findOne(filter);

      if (existingUser) {
        return res.send({ message: "User Already Exists" });
      }
      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    app.get("/users", verifyJWT, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post("/product", async (req, res) => {
      const userData = req.body;
      const result = await productsCollection.insertOne(userData);
      res.send(result);
    });

    app.post("/upcoming-product", async (req, res) => {
      const productData = req.body;
      const result = await upcomingProductsCollection.insertOne(productData);
      res.send(result);
    });

    app.get("/upcoming-products", async (req, res) => {
      const result = await upcomingProductsCollection.find().toArray();
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(filter);
      res.send(result);
    });

    app.patch("/product/:id", async (req, res) => {
      const id = req.params.id;
      const updateProductInfo = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateProduct = {
        $set: {
          pictureUrl: updateProductInfo.pictureUrl,
          price: updateProductInfo.price,
          ram: updateProductInfo.ram,
          rom: updateProductInfo.rom,
          quantity: updateProductInfo.quantity,
          additionalInfo: updateProductInfo.additionalInfo,
        },
      };
      const result = await productsCollection.updateOne(filter, updateProduct);
      res.send(result);
    });

    app.patch("/users/role/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateRole = {
        $set: {
          role: "admin",
        },
      };
      const result = await usersCollection.updateOne(filter, updateRole);
      res.send(result);
    });

    app.patch("/users/role/user/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateRole = {
        $set: {
          role: "user",
        },
      };
      const result = await usersCollection.updateOne(filter, updateRole);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(filter);
      res.send(result);
    });

    app.delete("/upcoming-products/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };
      const result = await upcomingProductsCollection.deleteOne(filter);
      res.send(result);
    });

    app.get("/product-details/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(filter);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Is Working");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
