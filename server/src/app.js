const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const { PORT } = require('./config');
const auth = require('./routes/auth');

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// Use Routes
app.use('/api/auth', auth);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
