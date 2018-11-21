const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = (env) => {
    const prod = env.NODE_ENV === 'production';
    const debug = env.DEBUG === 'true';
    const config = {
        mode: prod ? 'production' : 'development',
        entry: './componentes/App.jsx',
        output: {
            filename: '[name].[contenthash].js',
            path: `${__dirname}/dist`,
            publicPath: '/'
        },
        resolve: { extensions: ['.js', '.jsx'] },
        module: {
            rules: [{
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    'targets': !prod
                                        ? 'last 1 chrome version'
                                        : ['> 1%', 'ie 10']
                                }
                            ],
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime',
                            prod ? '@babel/plugin-transform-react-inline-elements' : {},
                            prod ? 'transform-remove-console' : {}
                        ],
                        cacheDirectory: true
                    }
                },
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: !prod,
                            // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            localIdentName: '[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('precss')(),
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            }, {
                test: /\.(jpe?g|png|gif|eot|woff2?|ttf|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: prod ? 'assets/[hash].[ext]' : 'assets/[name].[hash].[ext]' }
                }]
            }]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({ template: './index.html' }),
            new webpack.DefinePlugin({
                DEBUG: debug
            })
        ],
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        devServer: {
            historyApiFallback: false
        }
    };

    if (!prod) {
        config.devtool = 'source-map';
        config.plugins.push(
            new WebpackNotifierPlugin({ title: 'Webpack', skipFirstNotification: true })
        );
    }

    console.log('production', prod);
    console.log('debug', debug);

    return config;
};