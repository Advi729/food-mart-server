const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    console.log('env: ', process.env.MONGODB_URL);
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully.');
  } catch (error) {
    console.log('Database Error.');
  }
};

module.exports = dbConnect;