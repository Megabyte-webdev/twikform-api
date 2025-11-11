import express from "express";
import bodyParser from "body-parser";
import { db } from "./db.js";
import { submissions } from "./schema.js";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TWIK Foundation Form API",
      version: "1.0.0",
      description: "API documentation for form submissions",
    },
    paths: {
      "/api/submit-form": {
        post: {
          summary: "Submit a new form",
          tags: ["Submissions"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: [
                    "fullName",
                    "email",
                    "institution",
                    "phone",
                    "course",
                    "level",
                  ],
                  properties: {
                    fullName: { type: "string" },
                    email: { type: "string" },
                    institution: { type: "string" },
                    phone: { type: "string" },
                    course: { type: "string" },
                    level: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Form submitted successfully" },
            400: { description: "Missing required fields" },
            500: { description: "Server error" },
          },
        },
      },
      "/api/submissions": {
        get: {
          summary: "Get all submissions",
          tags: ["Submissions"],
          responses: {
            200: { description: "List of all submissions" },
            500: { description: "Server error" },
          },
        },
      },
    },
  },
  apis: [],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// POST endpoint
app.post("/api/submit-form", async (req, res) => {
  try {
    const { fullName, email, institution, phone, course, level } = req.body;

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

    const result = await db
      .insert(submissions)
      .values({ fullName, email, institution, phone, course, level })
      .returning();

    res.status(201).json({ success: true, data: result[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, error: "Failed to submit form" });
  }
});

// GET endpoint
app.get("/api/submissions", async (req, res) => {
  try {
    const results = await db.select().from(submissions);
    res
      .status(200)
      .json({ success: true, count: results.length, data: results });
  } catch (err) {
    console.error("Database error:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch submissions" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
