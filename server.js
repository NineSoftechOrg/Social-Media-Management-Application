// server.js

const fs = require('fs');
const https = require('https');
const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Use SSL certificates
  const options = {
    key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
  };

  // Serve Next.js pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Create HTTPS server
  https.createServer(options, server).listen(3000, () => {
    console.log('Server running at https://localhost:3000');
  });
});
