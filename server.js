import express from "express";
import bodyParser from "body-parser";
import { db } from "./db.js";
import { submissions } from "./schema.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST /api/submit-form
app.post("/api/submit-form", async (req, res) => {
  try {
    const { fullName, email, institution, phone, course, level } = req.body;

    // Validation
    const missingFields = [];
    if (!fullName) missingFields.push("fullName");
    if (!email) missingFields.push("email");
    if (!institution) missingFields.push("institution");
    if (!phone) missingFields.push("phone");
    if (!course) missingFields.push("course");
    if (!level) missingFields.push("level");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Insert into database
    const result = await db
      .insert(submissions)
      .values({
        fullName,
        email,
        institution,
        phone,
        course,
        level,
      })
      .returning();

    res.status(201).json({
      success: true,
      data: result[0],
    });
  } catch (err) {
    console.error("Database error:", err);

    res.status(500).json({
      success: false,
      error: "Failed to submit form. Please try again later.",
    });
  }
});

// GET /api/submissions
app.get("/api/submissions", async (req, res) => {
  try {
    const results = await db.select().from(submissions);

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (err) {
    console.error("Database error:", err);

    res.status(500).json({
      success: false,
      error: "Failed to fetch submissions. Please try again later.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
