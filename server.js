const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to serve index.html manually (optional if using express.static)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint to save email
app.post("/signup", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  fs.appendFile("emails.txt", email + "\n", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to save email." });
    }
    res.json({ message: "Thanks for signing up!" });
  });
});

// Endpoint to handle chat
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    /*const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });*/
    const replies = [
  "That's interesting! Tell me more.",
  "I totally get you — keep going.",
  "Hmm, let's think about that together.",
  "Sounds like you're doing your best!",
  "Cool! Want to try a study challenge next?"
];
const fakeReply = replies[Math.floor(Math.random() * replies.length)];
res.json({ reply: fakeReply });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating response from OpenAI.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
