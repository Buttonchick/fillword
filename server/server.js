const express = require('express');
const cors = require('cors');
const app = express();
const wordCheckRoutes = require('./routes/checkElements');


app.use(cors());

app.use('/api', wordCheckRoutes);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
