const webpack                    = require('webpack');
const CleanWebpackPlugin         = require('clean-webpack-plugin');
const ExtractTextPlugin          = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path                       = require('path');

const NODE_ENV                   = process.env.NODE_ENV;

const publicPath                 = '/public/assets/';
const cssName                    = 'style.min.css';
const jsName                     = 'bundle.js';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
  }),
  new ExtractTextPlugin({
    filename: cssName,
    disable: NODE_ENV !== 'production',
  }),
  new ForkTsCheckerWebpackPlugin({
    tslint: './tslint.json',
  }),
];

if (NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin([ 'assets' ], {
      root: path.join(__dirname, 'public'),
      verbose: true,
    })
  );
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        unsafe: true,
      },
    })
  );
} else {
    plugins.push(
      new webpack.NamedModulesPlugin()
    );
}

module.exports = {
  entry: {
    'app': [
      'react-hot-loader/patch',
      'babel-polyfill',
      './src/main.tsx',
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.join(__dirname, 'src/components'),
      constants: path.join(__dirname, 'src/constants'),
      pages: path.join(__dirname, 'src/pages'),
      src: path.join(__dirname, 'src'),
    }
  },
  plugins,
  output: {
    path: `${__dirname + publicPath}`,
    filename: jsName,
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: [/node_modules/, /public/]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    require('autoprefixer'),
                  ];
                },
              },
            },
            'sass-loader',
          ],
        }),
      }, {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: "eslint-loader",
        options: {
          configFile: './.eslintrc',
          failOnError: false,
          failOnWarning: false,
          emitWarning: true,
        },
        exclude: /node_modules/,
      }, {
        test: /\.tsx?$/,
        use: [
          {
            // for hot module replacement
            loader: 'babel-loader',
            options: {
              babelrc: true,
              plugins: ['react-hot-loader/babel'],
            },
          }, {
            loader: 'ts-loader',
            options: {
              // Type ckeching in fork plugin
              transpileOnly: true,
            },
          }
        ],
        // loader: 'ts-loader',
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],

      }, {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2|)$/,
        loader: 'file-loader?name=img/[name].[ext]',
      }, {
        test: /\.wav$/,
        loader: 'file-loader?name=sounds/[name].[ext]',
      },
    ],
  },
};
