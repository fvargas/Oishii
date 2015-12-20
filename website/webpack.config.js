const path = require('path');

const JSX_DIR = path.resolve('src/jsx');
const JSX_VIEWS_DIR = path.join(JSX_DIR, 'views');
const JSX_COMPONENTS_DIR = path.join(JSX_DIR, 'components');
const LESS_DIR = path.resolve('src/less');
const LESS_VIEWS_DIR = path.join(LESS_DIR, 'views');
const LESS_COMPONENTS_DIR = path.join(LESS_DIR, 'components');

module.exports = {
  entry: JSX_DIR + '/app.jsx',
  output: {
    path: './static',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: JSX_DIR,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          cacheDirectory: 'babel_cache',
        },
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less' },

      // 48200 was chosen so for map-icons package, only map-icons.ttf would be
      // inlined
      { test: /\.(eot|ttf|woff|svg)$/, loader: 'url?limit=48200' },
    ],
  },
  resolve: {
    root: [JSX_VIEWS_DIR, JSX_COMPONENTS_DIR, LESS_VIEWS_DIR, LESS_COMPONENTS_DIR],
  },
};
