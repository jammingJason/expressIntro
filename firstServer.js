const express = require('express');

const app = express();

// Listen for requests
app.listen(3000, () => {
  console.log('This is the server running on port 3000');
});
