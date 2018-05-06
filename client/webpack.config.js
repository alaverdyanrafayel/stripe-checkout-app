const DashboardPlugin = require("webpack-dashboard/plugin");
const Dotenv = require('dotenv-webpack');
const host = process.env.HOST || "127.0.0.1";
const port = 3000;
const webpack = require("webpack");
const path = require("path");

module.exports = {
    context: __dirname,

    devtool: 'source-map',

    entry: {
        app: ['babel-polyfill', './src/']
    },

    output: {
        path: path.resolve('./src'),
        publicPath: 'js/',
        filename: 'app.js'
    },

    resolve: {
        alias: {
            images: path.resolve(__dirname, 'assets/images'),
            components: path.resolve(__dirname, 'src/components'),
            helpers: path.resolve(__dirname, 'src/helpers'),
            configs: path.resolve(__dirname, 'src/configs'),
            sass: path.resolve(__dirname, 'assets/sass'),
            text: path.resolve(__dirname, 'src/text'),
            app: path.resolve(__dirname, 'src/app'),
            api: path.resolve(__dirname, 'src/api')
        },
        extensions: ['.jsx', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]
            }
        ]
    },

    devServer: {
        contentBase: "./public",
        noInfo: true,
        hot: true,
        inline: true,
        compress: true,
        disableHostCheck: true,
        historyApiFallback: true,
        port: port,
        host: host
    },

    plugins: [
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
            systemvars: true,
            silent: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new DashboardPlugin()
    ]
};
