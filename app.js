const express = require('express');
const https = require('https'); // Require the 'https' module
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 443; // Use port 443 for HTTPS

const authReturn = {
  access_token: "eyJraWQiOiIxIiwiYWxnIjoiUlM1MTIifQ",
  token_type: "IHE-JWT",
  expires_in: 9999,
  userId: 12345
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
  console.log("Resource hit : " + resource)
  res.json({ resource });
});

// Load SSL/TLS certificates
const privateKey = fs.readFileSync('cert-key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start the HTTPS server
httpsServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});