// const express = require("express");
// const mongoose = require("mongoose");
// const Sentiment = require("sentiment");
// const app = express();
// const dbName = "sentiment-analysis-db";
// const collectionName = "text-data";
// app.use(express.json()); // middleware

// const sentiment = new Sentiment();
// mongoose
//   .connect("mongodb+srv://doradlahari:nlp@cluster0.0eg4uqv.mongodb.net/")
//   .then(() => {
//     console.log("nlp db had connected newly.....!!!!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// // Set up the route to handle text submissions
// app.post('/submit', (req, res) => {
//   const result = sentiment.analyze(req.body.text);
//   if (result.score > 0) {
//     res.json({ message: "Positive review!" });
//   } else if (result.score === 0) {
//     res.json({ message: "Neutral review." });
//   } else {
//     res.json({ message: "Negative review." });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Hello hari this is your nlp app");
// });

// app.listen(3000, () => {
//   console.log(" server is listening on 3000 ");
// });
const express = require("express");
const mongoose = require("mongoose");
const Sentiment = require("sentiment");
const app = express();
const dbName = "sentiment-analysis-db";
const collectionName = "text-data";
app.use(express.json()); // middleware

const sentiment = new Sentiment();
mongoose
  .connect(
    "mongodb+srv://doradlahari:nlp@cluster0.0eg4uqv.mongodb.net/" +
      dbName +
      "?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("nlp db had connected newly.....!!!!!");
    app.listen(3000, () => {
      console.log(" server is listening on 3000 ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Define a schema for the collection
const textDataSchema = new mongoose.Schema({
  text: String,
  score: Number,
   message: String
});

// Create a model for the collection
const TextData = mongoose.model(collectionName, textDataSchema);

// Set up the route to handle text submissions
app.post("/submit", (req, res) => {
  const result = sentiment.analyze(req.body.text);
  const message = result.score > 0 ? "Positive review!" : result.score === 0 ? "Neutral review." : "Negative review.";
  const textData = new TextData({
    text: req.body.text,
    score: result.score,
    message: message
  });
  textData.save()
    .then(() => {
      res.json({ message: message });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});


app.get("/", (req, res) => {
  res.send("Hello hari this is your nlp app");
});














const compromise = require('compromise');
// Create a route for converting text to past, present, and future tense
app.post('/convert', (req, res) => {
  const sentence = req.body.text;

  const past = compromise(sentence).toPastTense().text();
  const present = compromise(sentence).text();
  const future = compromise(sentence).toFutureTense().text();

  res.json({ past: `I ${past}`, present: `I ${present}`, future: `I will ${future}` });
});