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
var root = mix.project.getRoot();

module.exports = function(content, file, conf) {
    conf.paths = [file.dirname, root];
    if (conf.syncImport === undefined) {
        conf.syncImport = true;
    }
    if (conf.relativeUrls === undefined) {
        conf.relativeUrls = true;
    }
    less.render(content, conf, function(error, output){
        if(error){
            throw error;
        } else {
            if(output.imports){
                mix.util.map(output.imports, function(path){
                    file.cache.addDeps(path);
                });
            }
            content = output.css;
        }
    });
    return content;
};
