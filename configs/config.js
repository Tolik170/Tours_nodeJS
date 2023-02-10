const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  CONNECT_OPTIONS: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};

module.exports = config;
