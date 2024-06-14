import React, { useState } from 'react';
import './styles.css';

const App = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const generateImage = async () => {
        try {
            const response = await fetch('http://localhost:3000/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const imageUrl = data.imageUrl;

            setImageUrl(imageUrl);
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };

    return (
        <div className="promotion">
            <h1>AI Image Generator</h1>
            <p>Type a prompt and generate an image!</p>
            <div className="input-container">
                <input 
                    type="text" 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder="Enter a prompt" 
                />
                <button onClick={generateImage}>Generate Image</button>
            </div>
            <div className="image-container">
                {imageUrl && <img src={imageUrl} alt="Generated" />}
            </div>
        </div>
    );
};

export default App;
