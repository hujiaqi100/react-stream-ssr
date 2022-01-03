const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT = path.resolve(__dirname);
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css less单独打包
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩打包后的less css
const clientWebpack = {
    target: 'node',
    mode: 'production',
    entry: path.resolve('src/index.jsx'),
    output: {
        path: path.resolve('dist'),
        filename: 'index.bundle.js',
        // publicPath: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        host: 'localhost',
        port: 3300,
        open: true,
        inline: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3100',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.ts[x]?$/,
                loader: [
                    'ts-loader'
                ]
            },
            {
                enforce: 'pre',
                test: /\.ts[x]$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: true,
                    configFile: false,
                    compact: false,
                    cacheDirectory: true,
                    cacheCompression: false,
                }
            },
            {
                test: /\.(png|jpg)$/,

                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: 'images/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        }
                    }
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // {
                    //     loader: 'style-loader', // 从 JS 中创建样式节点
                    // },
                    {
                        loader: 'css-loader', // 转化 CSS 为 CommonJS
                    },
                    {
                        loader: 'less-loader', // 编译 Less 为 CSS

                    }
                ],
            }
        ],

    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            '@': ROOT + '/src'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'temp/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'built.css',
            ignoreOrder: true
        }),
        new OptimizeCssAssetsPlugin()//执行压缩抽离出来的css
    ]
}
const serverWebpack = {
    target: 'node',
    mode: 'production',
    entry: path.resolve(__dirname, 'server.js'),
    output: {
        filename: 'vendor.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: true,
                    configFile: false,
                    compact: false,
                    cacheDirectory: true,
                    cacheCompression: false,
                }
            },
            {
                test: /\.css$/i,
                use: ['isomorphic-style-loader', "css-loader"],
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'isomorphic-style-loader',
                    },
                    // {
                    //     loader: 'style-loader', // 从 JS 中创建样式节点
                    // },
                    {
                        loader: 'css-loader', // 转化 CSS 为 CommonJS
                    },
                    {
                        loader: 'less-loader', // 编译 Less 为 CSS

                    }
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'built.css',
            ignoreOrder: true
        }),
        new OptimizeCssAssetsPlugin()//执行压缩抽离出来的css
    ]
}
module.exports = [clientWebpack, serverWebpack]
