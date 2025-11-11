export const swaggerOptions = {
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
  apis: [], // no need to scan routes anymore
};
