const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

// module.exports = {
// 	entry: {
// 		index: "./index.tsx"
// 	}, // 진입점 파일
// 	output: {
// 		path: path.join(__dirname, 'bundle'),
// 		filename: '[name].bundle.js'
// 	},
// 	module: {
// 		rules: [
//       {
//         test: /\.tsx?$/,
//         exclude: /node_modules/,
//         use: 'ts-loader',
//       },
//       {
//         test: /\.(tsx?|js)$/,
//         exclude: /node_modules/,
//         use: 'babel-loader',
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
// 	},
// 	devServer: {
// 		historyApiFallback: true,
// 		port: 8000, 
// 		hot: true,
// 	},
// 	resolve: {
// 		extensions: [
// 			".js", ".jsx", ".ts", ".tsx"
// 		]
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: "./index.html"
// 		})
// 	]
// };

const clientConfig = {
  entry: './index.tsx',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(tsx?|js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
  },
  resolve: {
    extensions: ['.tsx','.ts','.js'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔 로그 제거
          },
          output: {
            comments: false, // 주석 제거
          },
        },
      }),
    ],
  },
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, './dist'),
  },

};
const serverConfig = {
  entry: './index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔 로그 제거
          },
          output: {
            comments: false, // 주석 제거
          },
        },
      }),
    ],
  },
};

module.exports = [clientConfig, serverConfig];