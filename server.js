const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/completions', async (req, res) => {
    console.log('API_KEY', process.env.REACT_APP_API_KEY);
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model:  'gpt-3.5-turbo',
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100
        })
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data);
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () => console.log('Your server is running on port: ' + PORT));