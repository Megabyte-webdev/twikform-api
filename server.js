import express from "express";
import bodyParser from "body-parser";
import { db } from "./db.js";
import { submissions } from "./schema.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const upload = multer({ dest: "uploads/" });

// POST /api/submit-form
app.post("/api/submit-form", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const filePath = req.file ? req.file.path : null;

    const result = await db
      .insert(submissions)
      .values({
        name,
        email,
        message,
      })
      .returning();

    res.status(201).json({
      success: true,
      data: result[0],
      file: filePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
