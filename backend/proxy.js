const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.post("/api/translate", async (req, res) => {
    try {
        const response = await axios.post(
            "https://cloudtranslate.net/api/translate/unique",
            req.body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        res.status(response.status).json(response.data);
        console.log(response.data);
    } catch (error) {
                console.log(error.message);

        // Handle errors and forward them
        console.error("Error forwarding request:", error);
        res.status(error.response ? error.response.status : 500).json({
            message: "An error occurred while forwarding the request.",
            error: error.message,
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
