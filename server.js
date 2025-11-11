import express from "express";
import dotenv from "dotenv";
import submissionsRoutes from "./routes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger.js";

dotenv.config();
const app = express();
app.use(express.json());

// Use routes
app.use("/api", submissionsRoutes);

// Swagger setup with explicit configuration
const specs = swaggerJsdoc(swaggerOptions);

// Swagger UI options
const swaggerUiOptions = {
  explorer: true,
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "TWIK Foundation API Docs",
  swaggerOptions: {
    persistAuthorization: true,
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// Serve Swagger UI assets explicitly (important for production)
app.get("/swagger-ui-bundle.js", (req, res) => {
  res.redirect("https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js");
});

app.get("/swagger-ui-standalone-preset.js", (req, res) => {
  res.redirect(
    "https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"
  );
});

app.get("/swagger-ui.css", (req, res) => {
  res.redirect("https://unpkg.com/swagger-ui-dist/swagger-ui.css");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
