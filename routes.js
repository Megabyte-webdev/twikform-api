import express from "express";
import { db } from "./db.js";
import { submissions } from "./schema.js";

const router = express.Router();

router.post("/submit-form", async (req, res) => {
  try {
    const { fullName, email, institution, phone, course, level } = req.body;
    const missingFields = [];
    if (!fullName) missingFields.push("fullName");
    if (!email) missingFields.push("email");
    if (!institution) missingFields.push("institution");
    if (!phone) missingFields.push("phone");
    if (!course) missingFields.push("course");
    if (!level) missingFields.push("level");

    if (missingFields.length > 0)
      return res.status(400).json({
        success: false,
        error: `Missing: ${missingFields.join(", ")}`,
      });

    const result = await db
      .insert(submissions)
      .values({ fullName, email, institution, phone, course, level })
      .returning();

    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        success: false,
        error: "Email already exists.",
        detail: err.detail, // “Key (email)=(example@gmail.com) already exists.”
      });
    }

    if (err.code) {
      return res.status(400).json({
        success: false,
        error: err.message,
        detail: err.detail,
        code: err.code,
      });
    }
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

router.get("/submissions", async (req, res) => {
  try {
    const results = await db.select().from(submissions);
    res
      .status(200)
      .json({ success: true, count: results.length, data: results });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch submissions" });
  }
});

export default router;
