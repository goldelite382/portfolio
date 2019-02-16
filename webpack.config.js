const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists



module.exports = env => {
// Load .env[.environment] file variables
	const baseEnv = path.join(__dirname) + '/.env';
	let currentEnv = baseEnv;
	if(env && env.ENVIRONMENT) currentEnv += '.' + env.ENVIRONMENT;
	const trueEnv = fs.existsSync(currentEnv) ? currentEnv : baseEnv;
	const envFile = dotenv.config({ path: trueEnv }).parsed;
	const envKeys = Object.keys(envFile).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(envFile[next]);
		return prev;
	}, {});




	return {
		entry: {
			index: './src/client.js',
		},


		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
		},

		devtool: "inline-source-map",
	  
		resolve: {
			extensions: ['.js', '.css', '.scss']
		},

		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				},
			
				{
					test: /\.s?css$/,
					loader: [
						{ loader: MiniCssExtractPlugin.loader },
						{
							loader: 'css-loader',
							query: {
								localIdentName: '[hash:8]',
								modules: true
							}
						},
						{
							loader: 'sass-loader',
						}
					]
				}
			]
		},

		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new webpack.DefinePlugin(envKeys),
		]
	}
};
