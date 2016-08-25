/**
 * mix-parser-less
 * A parser for mix to compile less file.
 *
 * @required
 * less [https://www.npmjs.com/package/less]
 *
 * @see http://lesscss.org/
 * @see https://github.com/fouber/fis-parser-less
 * 
 * @author  Yang,junlong at 2016-08-25 16:56:43 build.
 * @version $Id$
 */

var less = require('less');
var root = mix.project.getProjectPath();

module.exports = function(content, file, conf) {
    conf.paths = [ file.dirname, root ];
    if (conf.syncImport === undefined) {
        conf.syncImport = true;
    }
    if (conf.relativeUrls === undefined) {
        conf.relativeUrls = true;
    }
    var parser = new(less.Parser)(conf);
    parser.parse(content, function (err, tree) {
        if(err){
            throw err;
        } else {
            if(parser.imports){
                fis.util.map(parser.imports.files, function(path){
                    file.cache.addDeps(path);
                });
            }
            content = tree.toCSS(conf);
        }
    });
    return content;
};
