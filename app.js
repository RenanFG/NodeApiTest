const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const authReturn = {
    access_token : "eyJraWQiOiIxIiwiYWxnIjoiUlM1MTIifQ",
    token_type  : "IHE-JWT",
    expires_in : 9999,
    userId  : 12345
}

// Parse JSON requests
app.use(bodyParser.json());

// POST endpoint
app.post('/api/echo', (req, res) => {
  const requestData = req.body;
  res.json(requestData);
});

app.post('/delegate/token', (req, res) => {
    console.log("token hit")
    res.json(authReturn);
  });

  app.post('/HealthDataRepository/r4/:resource', (req, res) => {
    const { resource } = req.params;
    console.log("Resource hit : "+ resource)
    res.json({ resource });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});