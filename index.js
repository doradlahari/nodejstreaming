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














// const compromise = require('compromise');
// // Create a route for converting text to past, present, and future tense
// app.post('/convert', (req, res) => {
//   const sentence = req.body.text;

//   const past = compromise(sentence).toPastTense().text();
//   const present = compromise(sentence).text();
//   const future = compromise(sentence).toFutureTense().text();

//   res.json({ past: `I ${past}`, present: `I ${present}`, future: `I will ${future}` });
// });\

const natural = require('natural');
const MongoClient = require('mongodb').MongoClient;
const db = client.db(dbName);
const collection = db.collection(collectionNamesecond);
// MongoDB connection URL
const url = "mongodb+srv://doradlahari:nlp@cluster0.0eg4uqv.mongodb.net/" ;

// MongoDB database name
const dbNamesecond = 'mydatabase';

// MongoDB collection name for training data
const collectionNamesecond = 'trainingData';

// Define training data
const trainingData = [
  { text: 'I love Node.js', category: 'technology' },
  { text: 'I hate spiders', category: 'animals' },
  { text: 'I enjoy playing guitar', category: 'music' },
  { text: 'I am afraid of heights', category: 'fears' },
  { text: 'I love hiking in the mountains', category: 'nature' },
];


// Connect to MongoDB and insert training data
MongoClient.connect(url,   dbNamesecond +
      "?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB', err);
    return;
  }


  // Insert training data into collection
  collection.insertMany(trainingData, (err, result) => {
    if (err) {
      console.error('Error inserting training data into MongoDB', err);
      client.close();
      return;
    }

    console.log('Training data inserted into MongoDB:', result.insertedCount);

    // Create classifier and train it with the training data
    const classifier = new natural.BayesClassifier();
    collection.find().toArray((err, documents) => {
      if (err) {
        console.error('Error retrieving training data from MongoDB', err);
        client.close();
        return;
      }

      documents.forEach(document => {
        classifier.addDocument(document.text, document.category);
      });

      classifier.train();

      // Define API endpoint for text classification
      app.post('/classify', (req, res) => {
        const textToClassify = req.body.text;
        const category = classifier.classify(textToClassify);
        res.json({ category });
      });

      console.log('Classifier trained with training data from MongoDB');
      client.close();
    });
  });
});
