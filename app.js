const express = require('express');
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost/UserInfo';

const app = express();

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on('open', () => console.log('Connected to MongoDB'));

app.use(express.json());

const userRouter = require('./routers/users');
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
