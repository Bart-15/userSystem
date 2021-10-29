const mongoose = require('mongoose');

const connectionURI = require('../config/keys_dev').MONGO_URI;

mongoose.connect(connectionURI, {useNewUrlParser: true, useUnifiedTopology: true})