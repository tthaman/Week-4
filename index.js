const server = require("./server");
const mongoose = require('mongoose');
db
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/week4', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  server.listen(port, () => {
   console.log(`Server is listening on http://localhost:${port}`);
  });
});
