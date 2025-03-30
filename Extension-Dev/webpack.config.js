const path = require("path");

module.exports = {
  mode: "production", // "development" for debugging
  entry: {
    background: "./TLDR Extension/background.js",
    popup: "./TLDR Extension/popup/popup.js"
  },
  output: {
    filename: "[name].bundle.js", // [name] will be replaced with "background" and "popup"
    path: path.resolve(__dirname, "TLDR Extension/dist"), // Output to "TLDR Extension/dist"
  },
  resolve: {
    fallback: {
      "fs": false, // Disable unsupported Node.js modules
      "path": false
    }
  },
  mode: "production"
};
