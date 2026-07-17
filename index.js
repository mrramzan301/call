const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Hugging Face API URL
const HF_API_URL = "https://huiyi67-fixdar.hf.space/call";

// Main Call Route
app.get('/call', (req, res) => {
    const { number, count } = req.query;

    if (!number) {
        return res.status(400).json({ "error": "Please provide a phone number." });
    }

    const totalCount = count ? parseInt(count) : 1;

    // Background request to Hugging Face
    fetch(`${HF_API_URL}?number=${number}&count=${totalCount}`)
        .then(() => console.log(`Forwarded: ${number}`))
        .catch((err) => console.error(`Error: ${err.message}`));

    // Sirf 3 cheezon ka clean response
    res.json({
        "success": true,
        "developer": "Developed by Ramzan Ahsan",
        "join_group": "https://chat.whatsapp.com/LYqp196iG0E0H5QtPR3ogZ"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
