const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')
const passport = require('passport');
require('./db/mongoose')
// passport config



const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(userRouter)

app.use(passport.initialize());
require('./config/passport')(passport)

app.listen(port, () => {
    console.log('listening on port ' + port)
});