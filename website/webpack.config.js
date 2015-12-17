module.exports = {
  entry: './jsx/app',
  output: {
    path: './static',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: __dirname + '/jsx',
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          cacheDirectory: 'babel_cache',
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
