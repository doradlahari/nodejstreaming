// // const express = require("express");
// // const mongoose = require("mongoose");
// // const Grid = require('gridfs-stream');
// // const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
// // const multer = require('multer');
// // const app = express();
// // const fs=require('fs')
// // app.use(express.json()); // mididle ware

// // mongoose
// //   .connect(
// //     "mongodb+srv://mernapi:mernapi2022@cluster1.iahl2gn.mongodb.net/test"
// //   )
// //   .then(() => {
// //     console.log("streaming db had connceted newly.....!!!!!");
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// //   app.get("/", (req, res) => {
// //   res.send("Hello hari this is your streaming app");
// // });

// // const conn = mongoose.connection;

// // // Init gfs
// // let gfs;

// // conn.once('open', () => {
// //   // Init stream
// //   gfs = Grid(conn.db, mongoose.mongo);
// //   gfs.collection('videos');
// // });
// //   const videoFileMap={
// //     'cdn':"videos/cdn.mp4",
// //     "generate-pass":"videos/generate-pass.mp4",
// //     "get-post":"vidoes/get-post.mp4",
// //     "index-video":"videos/index-video.mp4"
// //   }
// //   app.get('/videos/:filename',(req,res)=>{
// // const fileName=req.params.filename;
// // const filePath=videoFileMap[fileName]
// // if(!filePath){
// //     return res.status(404).send('file not found')
// // }
// // const stat=fs.statSync(filePath);
// // const fileSize=stat.size;
// // const range = req.headers.range
// // if(range){
// //     const parts=range.replace(/bytes=/,'').split('-')
// //     const start=parseInt(parts[0],10)
// //     const end=parts[1]? parseInt(parts[1],10) : fileSize-1;
// //     const chunkSize=end-start+1;
// //     const file=fs.createReadStream(filePath,{start,end});
// //     const head={
// //         'Content-Range':`bytes ${start}-${end}/${fileSize}`,
// //         'Accept-Ranges':'bytes',
// //         'Content-Length':chunkSize,
// //         'Content-Type':'video/mp4'
// //     };
// //     res.writeHead(206,head);
// //     file.pipe(res)
// // }else{
// //     const head={
// //         'Content-Length':fileSize,
// //         'Content-Type':'video/mp4'
// //     };
// //     res.writeHead(200,head);
// //     fs.createReadStream(filePath).pipe(res);
// // }
// //   })

  
// // // Create storage engine
// // const storage = new GridFsStorage({
// //   url: 'mongodb://localhost:27017/mydatabase',
// //   file: (req, file) => {
// //     return {
// //       filename: file.originalname,
// //       bucketName: 'videos'
// //     };
// //   }
// // });

// // const upload = multer({ storage });

// // // Stream video to client
// // app.get('/videos/:filename', (req, res) => {
// //   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
// //     if (!file) {
// //       return res.status(404).send('File not found');
// //     }

// //     // Check if video
// //     if (file.contentType === 'video/mp4' || file.contentType === 'video/quicktime') {
// //       // Read output to browser
// //       const readstream = gfs.createReadStream(file.filename);
// //       readstream.pipe(res);
// //     } else {
// //       res.status(404).send('Not a video file');
// //     }
// //   });
// // });
// //   app.listen(3000,()=>{
// //     console.log(' server is listening on 3000 ')
// //   })
// //   app.post('/upload', upload.single('file'), (req, res) => {
// //   res.redirect('/');
// // });





// const express = require("express");
// const app = express();

// app.get('/videos/:filename',(req,res)=>{
//   const fileName=req.params.filename;
//   const filePath=`/path/to/videos/${fileName}`;
//   if(!fs.existsSync(filePath)){
//     return res.status(404).send('file not found')
//   }
//   const stat=fs.statSync(filePath);
//   const fileSize=stat.size;
//   const range = req.headers.range;
//   if(range){
//     const parts=range.replace(/bytes=/,'').split('-');
//     const start=parseInt(parts[0],10);
//     const end=parts[1]? parseInt(parts[1],10) : fileSize-1;
//     const chunkSize=end-start+1;
//     const file=fs.createReadStream(filePath,{start,end});
//     const head={
//         'Content-Range':`bytes ${start}-${end}/${fileSize}`,
//         'Accept-Ranges':'bytes',
//         'Content-Length':chunkSize,
//         'Content-Type':'video/mp4'
//     };
//     res.writeHead(206,head);
//     file.pipe(res);
//   } else {
//     const head={
//         'Content-Length':fileSize,
//         'Content-Type':'video/mp4'
//     };
//     res.writeHead(200,head);
//     fs.createReadStream(filePath).pipe(res);
//   }
// });

// // app.listen(3000,()=>{
// //   console.log('server is listening on 3000')
// // });




// const mongoose = require("mongoose");
// const Grid = require('gridfs-stream');
// const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
// const multer = require('multer');

// mongoose
//   .connect(
//     "mongodb+srv://doradlahari:streaming@cluster0.qlsigeq.mongodb.net/"
//   )
//   .then(() => {
//     console.log("streaming db had connceted newly.....!!!!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//   app.get("/", (req, res) => {
//   res.send("Hello hari this is your streaming app");
// });

// const conn = mongoose.connection;
// let gfs;

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('videos');
// });

// const storage = new GridFsStorage({
//   url: 'mongodb+srv://doradlahari:streaming@cluster0.qlsigeq.mongodb.net/',
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: 'videos'
//     };
//   }
// });

// const upload = multer({ storage });

// app.get('/videos/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     if (!file) {
//       return res.status(404).send('File not found');
//     }

//     // Check if video
//     if (file.contentType === 'video/mp4' || file.contentType === 'video/quicktime') {
//       // Read output to browser
//       const readstream = gfs.createReadStream(file.filename);
//       readstream.pipe(res);
//     } else {
//       res.status(404).send('Not a video file');
//     }
//   });
// });

// app.post('/upload', upload.single('file'), (req, res) => {
//   res.redirect('/');
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const natural = require('natural');
// const MongoClient = require('mongodb').MongoClient;
// const sentiment = require('sentiment');

// const app = express();
// const port = 3000;
// const mongoUrl = 'mongodb+srv://doradlahari:streaming@cluster0.qlsigeq.mongodb.net/';
// const dbName = 'sentiment-analysis-db';
// const collectionName = 'text-data';

// // Set up the Natural NLP library
// const tokenizer = new natural.WordTokenizer();
// const stemmer = natural.PorterStemmer;
// sentiment = new natural.SentimentAnalyzer('English', stemmer, 'afinn');

// // Set up the MongoDB client
// const client = new MongoClient(mongoUrl, { useNewUrlParser: true });

// // Parse JSON request bodies
// app.use(bodyParser.json());

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


// // Connect to the MongoDB client and start the server
// client
//   .connect(
//     "mongodb+srv://doradlahari:streaming@cluster0.qlsigeq.mongodb.net/"
//   )
//   .then(() => {
//     console.log("nlp db had connceted newly.....!!!!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//   app.get("/", (req, res) => {
//   res.send("Hello hari this is your nlp app");
// });

//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });


// const express = require('express');
// const bodyParser = require('body-parser');
// const natural = require('natural');
// const MongoClient = require('mongodb').MongoClient;

// const app = express();
// const port = 3000;
// const mongoUrl = 'mongodb+srv://doradlahari:streaming@cluster0.qlsigeq.mongodb.net/';
// const dbName = 'sentiment-analysis-db';
// const collectionName = 'text-data';
// const sentiment = require('sentiment');
// const sentimentModule = require('sentiment');

// // Set up the Natural NLP library
// // Set up the Natural NLP library
// const tokenizer = new natural.WordTokenizer();
// const stemmer = natural.PorterStemmer;
// let sentimentStatement = new natural.SentimentAnalyzer('English', stemmer, 'afinn');

// // Set up the route to handle text submissions
// app.post('/submit', (req, res) => {
//   const result = sentimentStatement.analyze(req.body.text);
//   if (result.score > 0) {
//     res.json({ message: "Positive review!" });
//   } else if (result.score === 0) {
//     res.json({ message: "Neutral review." });
//   } else {
//     res.json({ message: "Negative review." });
//   }
// });

// // Set up the MongoDB client
// const client = new MongoClient(mongoUrl, { useNewUrlParser: true });

// // Parse JSON request bodies
// app.use(bodyParser.urlencoded({ extended: false }));

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

// // Connect to the MongoDB client and start the server
// client
//   .connect(
//     "mongodb+srv://doradlahari:streaming@cluster0.qlsigeq.mongodb.net/"
//   )
//   .then(() => {
//     console.log("nlp db had connceted newly.....!!!!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.get("/", (req, res) => {
//   res.send("Hello hari this is your nlp app");
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });




// const express = require('express');
// const bodyParser = require('body-parser');
// const natural = require('natural');
// const MongoClient = require('mongodb').MongoClient;
// const app = express();
// const port = 3000;
// const mongoUrl = 'mongodb+srv://doradlahari:streaming@cluster0.qlsigeq.mongodb.net/';
// const dbName = 'sentiment-analysis-db';
// const collectionName = 'text-data';
// const sentimentModule = require('sentiment');

// // Set up the Natural NLP library
// const tokenizer = new natural.WordTokenizer();
// const stemmer = natural.PorterStemmer;
// let sentimentStatement = new natural.SentimentAnalyzer('English', stemmer, 'afinn');

// // Set up the MongoDB client
// const client = new MongoClient(mongoUrl, { useNewUrlParser: true });

// // Connect to the MongoDB client and start the server
// client.connect(err => {
//   if (err) {
//     console.error('Error connecting to MongoDB', err);
//   } else {
//     console.log('Connected to MongoDB');
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Parse JSON request bodies
//     app.use(bodyParser.urlencoded({ extended: false }));
//     app.use(bodyParser.json());

//     // Set up the route to handle text submissions
//     app.post('/submit', (req, res) => {
//       const result = sentimentModule(req.body.text);
//       if (result.score > 0) {
//         res.json({ message: "Positive review!" });
//         console.log({ message: "Positive review!" });
//       } else if (result.score === 0) {
//         res.json({ message: "Neutral review." });
//         console.log({ message: "Neutral review." });
//       } else {
//         res.json({ message: "Negative review." });
//         console.log({ message: "Negative review." });
//       }
//     });

//     app.get("/", (req, res) => {
//       res.send("Hello hari this is your nlp app");
//     });

//     app.listen(port, () => {
//       console.log(`Server listening on port ${port}`);
//     });
//   }
// });


// VB, VBP, VBZ, VBG, and VBN are the Part-of-Speech (POS) tags assigned to verbs in the Penn Treebank POS tagging system.

// VB: Base form verb (e.g. "run")
// VBP: Present tense verb, not third person singular (e.g. "I run")
// VBZ: Present tense verb, third person singular (e.g. "he runs")
// VBG: Gerund or present participle verb (e.g. "running")
// VBN: Past participle verb (e.g. "run")
// In the code snippet you provided, these tags are used to map the original verb tags to their future tense form.



const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());

// MongoDB connection URL
const url = 'mongodb+srv://doradlahari:streaming@cluster0.qlsigeq.mongodb.net/';

// Database Name
const dbName = 'mydb';

// Connect to MongoDB server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if (err) {
    console.log('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected successfully to MongoDB server');

    // Specify the database
    const db = client.db(dbName);

    // API endpoint to convert present tense to future tense
    app.post('/present-to-future', (req, res) => {
      const presentText = req.body.text;
      const tokenizerConvertion = new natural.WordTokenizer();
      const naturalStatement = require('natural');
      const tokens = tokenizerConvertion.tokenize(presentText);
      const tags = naturalStatement.BrillPOSTagger.defaultInstance.tag(tokens);
      const taggedWords = tags.map((tag, index) => {
        return {
          word: tokens[index],
          tag: tag[1]
        };
      });
      const futureTags = {
        VB: 'VB',
        VBP: 'VB',
        VBZ: 'VB',
        VBG: 'VBG',
        VBN: 'VBN'
      };
      const futureTokens = taggedWords.map((taggedWord) => {
        const newTag = futureTags[taggedWord.tag] || taggedWord.tag;
        return newTag.startsWith('V') ? natural.conjugate(taggedWord.word, { tense: 'future' }) : taggedWord.word;
      });
      const futureText = futureTokens.join(' ');

      // Save the present and future text in MongoDB
      db.collection('sentences').insertOne({
        presentText: presentText,
        futureText: futureText
      }, function(err, result) {
        if (err) {
          console.log('Error inserting document:', err);
          res.status(500).send('Error inserting document');
        } else {
          console.log('Document inserted successfully:', result.ops[0]);
          res.send({ futureText: futureText });
        }
      });
    });

    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  }
});
