const express = require('express')
const app = express()
const port = 3000
const yelp = require("yelp-fusion");
const apiKey = '2_WxLeG9cKYvTWQYkcim3RVJW2FXPf0-8z_7gJtzMJ3QL_1t-BDnRFQtTZKaxtb9A9QShII12vb5DP8EzBnUAMFr4RsN70q0kgssltX1dFy4T1I4XZyZR1y_m6PpZHYx';

const client = yelp.client(apiKey);

app.get('/', (req, res) => {
  res.send('Success')
});

const yourCity = "sydney, nsw";

app.get('/search/best/pizza', (req, res) => {
  const searchRequest = {
    term: "pizza",
    location: yourCity,
    attributes: [
      'liked_by_vegetarians'
    ],
    sort_by: "rating"
  };

  client.search(searchRequest).then(response => {
    res.send(response.jsonBody);
  }).catch(e => {
    console.log(e);
  });

});
app.get('/search/best/', (req, res) => {
  const searchRequest = {
    term: "restaurants",
    location: yourCity,
    attributes: [
      'liked_by_vegetarians'
    ],
    sort_by: "rating"
  };

  client.search(searchRequest).then(response => {
    res.send(response.jsonBody);
  }).catch(e => {
    console.log(e);
  });

});


app.get('/search/:food/:city/', (req, res) => {
  const food = req.params.food;
  const city = req.params.city;
  const searchRequest = {
    term: food,
    location: city,
    attributes: [
      'liked_by_vegetarians'
    ]
  };

  client.search(searchRequest).then(response => {
    res.send(response.jsonBody);
  }).catch(e => {
    console.log(e);
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
