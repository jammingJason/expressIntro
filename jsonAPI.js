const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

CANDIES = [
  {
    name: 'Snickers',
    qty: 44,
    price: 1.5,
  },
  { name: 'Skittles', qty: 33, price: 0.99 },
];
app.get('/candies', (req, res) => {
  //   res.send('This is something');
  res.json(CANDIES);
});

app.post('/candies', (req, res) => {
  if (req.body.name.toLowerCase() === 'circus peanuts') {
    res.status(403).json({ msg: 'Horrible choice.  They are forbidden!' });
  }
  CANDIES.push(req.body);
  res.status(201).json(CANDIES);
});
app.listen(3000, () => {
  console.log('This is the server running on port 3000.  Enjoy!!');
});
