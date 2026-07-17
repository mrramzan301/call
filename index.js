const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Hugging Face API URL
const HF_API_URL = "https://huiyi67-fixdar.hf.space/call";

// Root Route (Home page response)
app.get('/', (req, res) => {
    res.json({
        "status": "Active",
        "developer": "Developed by Ramzan Ahsan",
        "whatsapp_group": "https://chat.whatsapp.com/LYqp196iG0E0H5QtPR3ogZ",
        "usage": "/call?number=03001234567&count=2"
    });
});

// Main Call Route
app.get('/call', (req, res) => {
    const { number, count } = req.query;

    if (!number) {
        return res.status(400).json({ "error": "Please provide a phone number." });
    }

    const totalCount = count ? parseInt(count) : 1;

    // Asynchronous background request (Vercel response ko block nahi karegi)
    fetch(`${HF_API_URL}?number=${number}&count=${totalCount}`)
        .then(() => console.log(`Successfully forwarded to HF: ${number}`))
        .catch((err) => console.error(`Error forwarding to HF: ${err.message}`));

    // Instant Response jaisa aapne manga tha
    res.json({
        "success": true,
        "message": "Request forwarded successfully to Hugging Face server. Processing in background...",
        "target_number": number,
        "total_requested": totalCount,
        "delay_per_call": "15 seconds",
        "developer": "Developed by Ramzan Ahsan",
        "join_group": "https://chat.whatsapp.com/LYqp196iG0E0H5QtPR3ogZ"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
