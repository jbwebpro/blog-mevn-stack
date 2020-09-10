const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add posts
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(0),
  });
  res.status(201).send();
});

// Delete posts
router.delete("/:post_id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.post_id) });
  res.status(200).send();
});

// Async Function Request
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://admin123:admin123@ds039088.mlab.com:39088/vue_express",
    {
      // useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  return client.db("vue_express").collection("posts");
}

module.exports = router;
