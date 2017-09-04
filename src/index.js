var through = require('through2');
var gutil = require('gulp-util');
var images = require('images');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-images-convert';

function imagesConvert(option) {
	option = Object.assign({ targetType: 'png', quality: 70 }, option);
	var targetType = option.targetType,
		quality = option.quality;

	var stream = through.obj(function (file, enc, cb) {
		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported'));
			return cb();
		}
		if (file.isBuffer()) {
			file.contents = images(file.contents).encode(targetType, quality);
		}

		this.push(file);

		cb();
	})

	return stream;
}

module.exports = imagesConvert;
