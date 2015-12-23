const path = require('path');

const STATIC_DIR = path.resolve('static');
const JSX_DIR = path.resolve('src/jsx');
const JSX_VIEWS_DIR = path.join(JSX_DIR, 'views');
const JSX_COMPONENTS_DIR = path.join(JSX_DIR, 'components');
const LESS_DIR = path.resolve('src/less');
const LESS_VIEWS_DIR = path.join(LESS_DIR, 'views');
const LESS_COMPONENTS_DIR = path.join(LESS_DIR, 'components');

const MAP_ICONS_DIR = path.resolve('node_modules/map-icons');
const UIKIT_DIR = path.resolve('node_modules/uikit');

module.exports = {
  entry: path.join(JSX_DIR, 'app.jsx'),
  output: {
    path: STATIC_DIR,
    publicPath: '/static/',
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
      { test: /\.css$/, loader: 'style!css!autoprefixer' },
      { test: /\.less$/, loader: 'style!css!autoprefixer!less' },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        include: MAP_ICONS_DIR,
        // 48200 was chosen so only map-icons.ttf would be inlined
        loader: 'url?limit=48200',
      },
      {
        test: /\.(otf|ttf|woff2?)$/,
        include: UIKIT_DIR,
        loader: 'url?limit=1',
      },
    ],
  },
  resolve: {
    root: [JSX_VIEWS_DIR, JSX_COMPONENTS_DIR, LESS_VIEWS_DIR, LESS_COMPONENTS_DIR],
  },
};
