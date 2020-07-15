const path = require("path");
const webpack = require("webpack");
// const {Configuration} =  webpack;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// import path from "path";
// import webpack, {Configuration} from "webpack";
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// import {CleanWebpackPlugin} from "clean-webpack-plugin";
// import BundleAnalyzerPlugin from "webpack-bundle-analyzer";
// import CompressionWebpackPlugin from "compression-webpack-plugin";

// const isProd = process.env.NODE_ENV === "production";
const isProduction =
    typeof process.env.NODE_ENV !== "undefined" && process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";
const devtool = isProduction ? "" : "cheap-module-source-map";
const packageName = process.env.npm_package_name;
const packageVersion = process.env.npm_package_version;
// console.log(process.env);

// const webpackConfig = (env: string): Configuration => ({
module.exports = {
    entry: "./src/index.tsx",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        // alias: {
        //     components: path.resolve(__dirname, "./src")
        // }
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js"
    },
    mode,
    devtool,
    devServer: {
        historyApiFallback: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ]
            }
        ]
    },
    optimization: {
        nodeEnv: "production",
        minimize: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": mode,
            "process.env.NAME": packageName,
            "process.env.VERSION": packageVersion
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./src/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            }
        }),
        new CleanWebpackPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new BundleAnalyzerPlugin(),
        new CompressionWebpackPlugin({
            filename: "[path].br[query]",
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
                // zlib’s `level` option matches Brotli’s `BROTLI_PARAM_QUALITY` option.
                level: 11
            },
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
        })
    ]
    // });
};

// export default webpackConfig;
