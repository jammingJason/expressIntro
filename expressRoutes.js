const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.send('Home Page');
});
app.get('/dogs', (req, res) => {
  console.log('Dogs are here.');
  console.log(req);
  return res.send('<h1>Woof, woof</h1>');
});

app.post('/chickens', (req, res) => {
  return res.send('You created another chicken');
});

app.get('/chickens', (req, res) => {
  return res.send('This is the get request.');
});

const greetings = {
  en: 'Hello',
  fr: 'Bonjour',
  ic: 'hallo',
  ja: 'konnichiwa',
};

app.get('/greet/:language', (req, res) => {
  const lang = req.params.language;
  const greeting = greetings[lang];
  return res.send(greeting);
});

app.get('/show-language', (req, res) => {
  res.send(req.headers['accept-language']);
});

app.get('/search', (req, res) => {
  console.log(req.query);
  const { sort = 'firstName', returnVisitor = false } = req.query;
  res.send(
    `You want to sort by ${sort}, and are you a return visitor? ${returnVisitor}`
  );
});

app.post('/register', (req, res) => {
  return res.send(req.body);
});
// Listen for requests
app.listen(3000, () => {
  console.log('This is the server running on port 3000.  Enjoy!!');
});
