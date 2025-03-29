const path = require("path");

module.exports = {
  mode: "production", // "development" for debugging
  entry: "./TLDR Extension/background.js", // <-- Fix the path here
  output: {
    filename: "background.bundle.js",
    path: path.resolve(__dirname, "TLDR Extension/dist"), // Output to "TLDR Extension/dist"
  },
  resolve: {
    fallback: {
      "fs": false, // Disable unsupported Node.js modules
      "path": false
    }
  }
};
