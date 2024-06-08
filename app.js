const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const uploadRoute = require('./routes/upload');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use('/api/upload', uploadRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
