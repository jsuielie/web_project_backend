const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

var API_URL = {
    production: JSON.stringify('http://tutorials-env.eba-m9jimr3a.ap-southeast-1.elasticbeanstalk.com'),
    development: JSON.stringify('http://localhost:5000')
}

// check environment mode
var environment = process.env.NODE_ENV.trim() === 'prod' ? 'production' : 'development';

module.exports = {
    mode: "production",
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
        new Dotenv(),
        new webpack.DefinePlugin({
            'API_URL': API_URL[environment]
        })
    ],
};


