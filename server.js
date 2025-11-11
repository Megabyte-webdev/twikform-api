import express from "express";
import dotenv from "dotenv";
import submissionsRoutes from "./routes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const app = express();
app.use(express.json());

// Use routes
app.use("/api", submissionsRoutes);

// Swagger setup - automatically reads JSDoc from routes
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TWIK Foundation Form API",
      version: "1.0.0",
      description: "API documentation for form submissions",
    },
  },
  apis: ["./routes/*.js"], // <- auto-read all JSDoc comments
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
