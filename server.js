import express from "express";
import dotenv from "dotenv";
import submissionsRoutes from "./routes.js";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger.js";

dotenv.config();
const app = express();
app.use(express.json());

// Use routes
app.use("/api", submissionsRoutes);

// Generate swagger spec
const specs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI using CDN
app.use("/api-docs", (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>TWIK Foundation API Docs</title>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
      <script>
        SwaggerUIBundle({
          spec: ${JSON.stringify(specs)},
          dom_id: '#swagger-ui',
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.SwaggerUIStandalonePreset
          ],
          layout: "BaseLayout"
        });
      </script>
    </body>
  </html>
  `;
  res.send(html);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
