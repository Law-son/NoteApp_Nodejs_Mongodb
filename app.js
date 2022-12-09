const express = require('express');
const noteController =  require('./controllers/noteController');

const app = express();

//setting up template/view engine
app.set('view engine', 'ejs');

//setup static file connections
app.use(express.static('./static_files'));

//start noteController
noteController(app);

//listen to port
app.listen(3000);
console.log("Listening to port 3000");
