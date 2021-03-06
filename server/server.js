const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, '../build')));
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up on port ${port}!`);
});