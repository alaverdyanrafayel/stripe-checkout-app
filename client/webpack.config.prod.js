const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        bundle: ['babel-polyfill', './src/']
    },

    output: {
        path: path.join(__dirname, 'production'),
        publicPath: '/',
        filename: 'js/[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js'
    },

    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            params: path.resolve(__dirname, 'src/configs/params'),
            helpers: path.resolve(__dirname, 'src/helpers'),
            configs: path.resolve(__dirname, 'src/configs'),
            sass: path.resolve(__dirname, 'assets/sass'),
            app: path.resolve(__dirname, 'src/app'),
            api: path.resolve(__dirname, 'src/api')
        },
        extensions: ['.jsx', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?name=[name].[ext]&outputPath=css/'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"})
            }
        ]
    },

    plugins: [
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe)
            systemvars: true,
            silent: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            mangle: true,
            sourcemap: true,
            beautify: false,
            dead_code: false
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new HtmlWebpackPlugin({
            title: 'Map App',
            chunks: ['bundle'],
            filename: 'index.html',
            template: './public/template/index.html'
        }),
        new ExtractTextPlugin({filename: "css/style-[chunkhash].css", allChunks: false}),
        new CopyWebpackPlugin([
            // {from: 'public/img', to: 'img'},
            // {from: 'public/fonts', to: 'fonts'}
        ], {debug: 'debug'})
    ]
};
