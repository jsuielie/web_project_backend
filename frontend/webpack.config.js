const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

let API_URL = {
    production: JSON.stringify('https://freecardboard.net'),
    docker: JSON.stringify('http://webapp-env.eba-hb5tq2bz.ap-southeast-1.elasticbeanstalk.com'),
    development: JSON.stringify('http://localhost:5000')
}

console.log(process.env.NODE_ENV);

module.exports = (env) => {
    return {
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
                'API_URL': API_URL[env.environment]
            })
        ],
    }
};


