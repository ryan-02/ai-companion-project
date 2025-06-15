const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/signup', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  fs.appendFile('emails.txt', email + '\n', err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to save email.' });
    }
    res.json({ message: 'Thanks for signing up!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
