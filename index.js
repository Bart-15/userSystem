const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(userRouter)

app.listen(port, () => {
    console.log('listening on port ' + port)
});