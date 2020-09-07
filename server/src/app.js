const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');

const { PORT, MONGO_URI, MONGO_DB_NAME } = require('./config');

const auth = require('./routes/auth');
const users = require('./routes/users');
const { authorization } = require('./middlewares/authorization');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json())

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`

mongoose
  .connect(db, {
    user: MONGO_DB_NAME,
    pass: MONGO_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('MongoDB Connected...')
  })
  .catch(err => console.log(err));

// Use Routes
app.use('/api/auth', auth)
app.use('/api/users', authorization, users)

app.use(errorMiddleware)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
  

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
