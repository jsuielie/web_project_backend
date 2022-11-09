const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

let API_URL = {
    production: JSON.stringify('https://freecardboard.net'),
    development: JSON.stringify('http://localhost:5000')
}

// check environment mode
let environment = process.env.NODE_ENV.trim() === 'production' ? 'production' : 'development';

console.log(process.env.NODE_ENV);

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new webpack.DefinePlugin({
            'API_URL': API_URL[environment]
        })
    ],
};


