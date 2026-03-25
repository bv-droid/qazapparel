const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root directory
app.use(express.static(path.join(__dirname), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    // Cache videos for longer
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days
    }
    // Proper MIME types
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));

// Bori sub-site
app.use('/bori', express.static(path.join(__dirname, 'bori')));

// Fallback to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/bori', (req, res) => {
  res.sendFile(path.join(__dirname, 'bori', 'index.html'));
});

app.get('/brandbook', (req, res) => {
  res.sendFile(path.join(__dirname, 'brandbook.html'));
});

app.get('/business-plan', (req, res) => {
  res.sendFile(path.join(__dirname, 'business-plan.html'));
});

app.listen(PORT, () => {
  console.log(`Qazaqstan Apparel running on port ${PORT}`);
});
