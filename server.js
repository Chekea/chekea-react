const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors"); // Import the cors middleware

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require("./src/chekeaapp-f5abe-firebase-adminsdk-7b59k-bd4867b735.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// API route to send a notification
app.post("/send-notification", async (req, res) => {
  try {
    const { token, title, body } = req.body;

    // Check if token is provided
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    // Create a message
    const message = {
      notification: {
        title,
        body,
      },
      token, // Provide the token here
    };

    // Send the message
    console.log(message);
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error sending notification:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to send notification" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
