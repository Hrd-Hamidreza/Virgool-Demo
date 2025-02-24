const path = require("path");

module.exports = {
  mode: "production", //! development Or production
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "./public/"),
  },
  devServer: {
    static: "./public/",
    historyApiFallback: true,
  },
};
