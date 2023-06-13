const PORT = 8000;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());



app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model:  '',
            method: [{role: "user", content: "how are you?"}],
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