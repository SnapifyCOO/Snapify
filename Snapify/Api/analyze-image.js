const express = require('express');
const multer = require('multer');
const axios = require('axios');
const upload = multer();

const app = express();
app.use(express.json());

app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
    try {
        const image = req.file;
        const response = await axios.post('https://api.openai.com/v1/images/analyze', {
            // Include image data and any necessary parameters
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const ingredients = response.data.ingredients;
        res.json({ ingredients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
