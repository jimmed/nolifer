const path = require('path')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ],
        exclude: __dirname
      },
      {
        test: /.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ],
        include: __dirname
      }
    ]
  }
}
