const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000

app.use(express.static('public'))

const connectDB = require('./config/db');
connectDB();


app.set('view engine', 'ejs'); // Set the template engine
app.set('views',path.join(__dirname,'./views'))

app.use('/api/files', require('./routes/files'))
app.use('/files',require('./routes/show'))

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})