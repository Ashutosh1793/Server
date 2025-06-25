const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

mongoose.connect('mongodb+srv://Ashutosh1793:Ashu1793@courses.50y01we.mongodb.net/?retryWrites=true&w=majority&appName=Courses', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Define Schema
const ImageSchema = new mongoose.Schema({
    url: String
});

const Image = mongoose.model('images', ImageSchema);

// Routes
app.get('/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
