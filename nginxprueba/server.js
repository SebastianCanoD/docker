const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const DataSchema = new mongoose.Schema({
    name: String,
    value: String
});
const Data = mongoose.model('Data', DataSchema);

app.post('/api/data', async (req, res) => {
    const { name, value } = req.body;
    const newData = new Data({ name, value });
    await newData.save();
    res.status(201).send(newData);
});

app.get('/api/data', async (req, res) => {
    const data = await Data.find();
    res.status(200).send(data);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});