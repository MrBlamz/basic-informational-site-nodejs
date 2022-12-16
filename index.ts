import * as express from 'express';
import * as path from 'path';

const app = express();

// Middleware
app.use('/public', express.static(path.join(__dirname, 'public')));

// File options
const OPTIONS = {
  root: path.join(__dirname, 'public'),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true,
  },
};

// Home page
app.get('/', (req, res, next) => {
  console.log('Request for Home page started!');

  res.sendFile('/pages/index.html', OPTIONS, (error) => {
    if (error) next(error);
  });
});

// About page
app.get('/about', (req, res, next) => {
  console.log('Request for About page started!');

  res.sendFile('/pages/about.html', OPTIONS, (error) => {
    if (error) next(error);
  });
});

// Contact page
app.get('/contact-me', (req, res, next) => {
  console.log('Request for Contacts page started!');

  res.sendFile('/pages/contact-me.html', OPTIONS, (error) => {
    if (error) next(error);
  });
});

// Error handler
app.get('*', (req, res, next) => {
  console.log('Request for 404 page started!');

  res.sendFile('/pages/404.html', OPTIONS, (error) => {
    if (error) next(error);
  });
});

// Starting code
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
