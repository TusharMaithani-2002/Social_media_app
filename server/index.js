const express = require('express');
const app = express();
const cors = require('cors')


app.use(cors());
app.use(express.json());

const userRoute = require('./routes/User');
app.use('/user',userRoute);

const uplaodRoute = require('./routes/Upload');
app.use('/upload',uplaodRoute);

app.listen(3001, (req,res) => {
    console.log('server running...');
});