const JSX_DIR = __dirname + '/src/jsx';
const JSX_VIEWS_DIR = JSX_DIR + '/views';
const JSX_COMPONENTS_DIR = JSX_DIR + '/components';
const LESS_DIR = __dirname + '/src/less';
const LESS_VIEWS_DIR = LESS_DIR + '/views';
const LESS_COMPONENTS_DIR = LESS_DIR + '/components';

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
      { test: /\.less$/, loader: 'style!css!less' },
    ],
  },
  resolve: {
    root: [JSX_VIEWS_DIR, JSX_COMPONENTS_DIR, LESS_VIEWS_DIR, LESS_COMPONENTS_DIR],
  },
};
