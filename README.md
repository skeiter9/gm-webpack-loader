# Gm loader for webpack

A loader for picture files with [gm](https://github.com/aheckmann/gm)

> for filename template placeholders, this loader inherits [file-loader](https://github.com/webpack/file-loader) options.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var image = require('gm?' +
  'name=images/[name]-[sha512:hash:base64:7].[ext]&' +
  'sizeH=480&' +
  'cropW=320!' +
  './images/my-pic.jpg');
```

## Options

- resizeH
- resizeW
- cropH
- cropW

... docs in progress

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
