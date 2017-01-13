// CONSTANTS
const ENV         = process.env.NODE_ENV,
      isProd      = ENV === 'production',
      path        = require('path'),
      shared      = require('./shared.js'),
      webpack     = require('webpack');

// PLUGINS
const CopyWebpackPlugin     = require('copy-webpack-plugin'),
      DashboardPlugin       = require('webpack-dashboard/plugin'),
      HtmlWebpackPlugin     = require('html-webpack-plugin'),
      HtmlWebpackPugPlugin  = require('html-webpack-pug-plugin'),
      ImageminPlugin        = require('imagemin-webpack-plugin').default,
      ProgressBarPlugin     = require('progress-bar-webpack-plugin');

// DEFAULT SETTINGS
let appEntry = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&noInfo=true&reload=true';
let buildProgress = true;
let sourcemaps = 'cheap-module-source-map';

// PRODUCTION SETTINGS
if (isProd) {
  appEntry = './client/app.module.ts';
  buildProgress = false;
  sourcemaps = 'eval-source-map';
}

let config = {

  context: path.join(__dirname, '..'),

  // ENTRY POINTS
  entry: {
    common: [
      './client/polyfills.ts',
      './client/vendor.ts'
    ],
    app: [
      appEntry,
      './client/client.ts'
    ]
  },

  // OUTPUT FILE
  output: {
    path: path.resolve(__dirname, '../_dist'),
    filename: 'bundle.js'
  },

  // SOURCEMAPS
  devtool: sourcemaps,

  // DIAPLAY BUILD PROGRESS
  progress: buildProgress,

  // LOADERS
  module: {
    loaders: [
      { // ASSETS
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      },
      { // JS
        test: /\.js$/,
        exclude: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../_dist')],
        loader: 'babel'
      },
      { // JSON
        test: /\.json$/,
        loader: 'json-loader'
      },
      { // PUG
        test: /\.pug$/,
        loader: 'pug-html-loader'
      },
      { // SASS
        test: /\.scss$/,
        loaders: [
          'raw',
          'sass-loader?sourceMap'
        ]
      },
      { // STYLUS
        test: /\.styl$/,
        loaders: [
          'raw',
          'stylus-loader'
        ],
        // NIB
        stylus: {
          use: [require('nib')()],
          import: ['~nib/lib/nib/index.styl']
        }
      },
      { // TYPESCRIPT
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          '@angularclass/hmr-loader'
        ]
      }
    ]
  },

  // PLUGINS
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ProgressBarPlugin(),

    // TERMINAL DASHBOARD
    new DashboardPlugin(),

    // ADD VENDOR MODULES TO SEPARATE FILE
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js', Infinity),

    // NG2 HACK: angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),

    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }
    }),

    new webpack.DefinePlugin({
      'ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })

  ],

  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.styl', '.html', '.pug', 'map'],
    exclude: ['node_modules']
  }

};


// ENV SPECIFIC SETTINGS
if (isProd) {

  config.plugins.push(

    // MINIFY JS
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: true,
      mangle: {
        keep_fnames: true
      },
      sourceMap: true
    }),

    // MINIFY IMAGES
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '95-100'
      }
    }),

    // COPY FILES IN PUBLIC DIR
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public')
    }]),

    // DON'T EMIT FILES IF THERE ARE ERRORS
    new webpack.NoErrorsPlugin(),

    // Search for equal or similar files and deduplicate them in the output
    new webpack.optimize.DedupePlugin()

  );

} else {

  if (shared.engines.html === 'pug') {
    config.plugins.push(

      new HtmlWebpackPlugin({
        filetype: 'pug',
        filename: 'index.pug',
        template: './server/views/index.pug',
        chunksSortMode: 'dependency'
      }),

      new HtmlWebpackPugPlugin()

    );
  }

}

module.exports = config;
