const JSX_DIR = __dirname + '/src/jsx';
const JSX_VIEWS_DIR = JSX_DIR + '/views';
const LESS_COMPONENTS_DIR = __dirname + '/src/less/components';

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
    root: [JSX_VIEWS_DIR, LESS_COMPONENTS_DIR],
  },
};
