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
// insert
async function insertImage() {
    const img = new Image({ url: "https://placekitten.com/300/300" });
    await img.save();
    console.log("Image inserted!");
}

// Call it once
insertImage();

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
