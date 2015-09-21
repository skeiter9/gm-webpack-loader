module.exports = function(content) {

  var callback = this.async();
  var gm = require('gm').subClass({imageMagick: true});
  var path = require('path');
  var loaderUtils = require('loader-utils');

  var query = loaderUtils.parseQuery(this.query);

  if (this.cacheable) this.cacheable();

  var options = {
    sizeW: query.sizeW || null,
    sizeH: query.sizeH || null,
    forceSize: query.forceSize || false,
    cropW: query.cropW || query.sizeW || 0,
    cropH: query.cropH || query.sizeH || 0
  };

  var url = loaderUtils.interpolateName(this, query.name || '[hash].[ext]', {
    context: query.context || this.options.context,
    content: content,
    regExp: query.regExp
  });

  var self = this;

  var exeImg = gm(content, url)
    .resize(options.sizeW, options.sizeH, options.forceSize ? '!' : '');

  if (
    parseInt(options.cropW) > 0 &&
    parseInt(options.cropH) > 0
  ) exeImg.crop(options.cropW, options.cropH, 0, 0)

  return exeImg.toBuffer(function(err, buffer) {
    if (err) return callback(err);
    self.emitFile(url, buffer);
    callback(null,
      'module.exports = __webpack_public_path__ + ' + JSON.stringify(url));
  });

  /*
  if (
    !Array.isArray(query.schemas)
  ) this.emitWarning('schemas for papercut isn\'t set');
  else if(
    Array.isArray(query.schemas) && query.schemas.length === 0
  ) this.emitWarning('there are not schemas for setup');
  */

};

module.exports.raw = true;
