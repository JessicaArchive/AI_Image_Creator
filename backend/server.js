const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openaiApiKey = process.env.OPENAI_API_KEY;

app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;
    console.log('Received prompt:', prompt);
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: prompt,
                n: 1,
                size: "256x256",
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('API response:', response.data);
        const imageUrl = response.data.data[0].url;
        res.json({ imageUrl: imageUrl });
    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        res.status(500).json({ error: 'Image generation failed' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
