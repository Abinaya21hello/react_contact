const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/', router);

mongoose.connect(
  "mongodb+srv://mabinaya2112:Ppkdnuwqt9OcOlin@cluster0.a8vdf5i.mongodb.net/contactform",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
