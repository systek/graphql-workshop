const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-83mfa.mongodb.net/test?retryWrites=true`;


const client = new MongoClient(uri, { useNewUrlParser: true });

app.get('*', (req, res) => {
  client.connect(err => {
    if (err) {
      console.log(err);
      res.status(500).send('unable to connect to db');
      return;
    }

    if (req.query.ingredient === undefined) {
      res.status(400).send('missing ingredient parameter');
      return;
    }

    const collection = client.db('gqlworkshop').collection('marketprice');
    // perform actions on the collection object
    collection.findOne({ 'ingredient': req.query.ingredient })
      .then(result => {
        if (result === null) {
          res.status(404).send(`unable to find ingredient: ${req.query.ingredient}`);
        } else {
          res.status(200).send(result);
        }
      })
      .catch(reason => {
        console.log(reason);
        res.status(500).send('Error extracting document');
      });
  });
});

module.exports = app;

if (process.env.IS_LOCAL) {
  app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
}
