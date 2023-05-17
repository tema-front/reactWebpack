const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./public/index.html"),
  }),
  new MiniCssExtractPlugin({
    filename: "static/css/main.[contenthash].css",
  }),
];

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "static/js/main.[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  plugins,
  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.s[ca]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[contenthash].[ext]",
            outputPath: "static/media",
          },
        },
      },
      {
        test: /\.ts(x?)$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devtool: "source-map",
  devServer: {
    port: 3000,
    hot: true,
  },
};
