(function(module){
  'use strict';
  var path = require('path'),
      clone = require('clone'),
      glob = require('glob'),
      fs = require('fs'),
      touch = require('touch');
  var gitkeep = function(targetDir, options, cb){
    if(typeof options === 'function') cb = options, options = {};
    if(!options) options = {};
    var opt = clone(options);

    opt.targetDir = path.resolve(targetDir);
    opt.callback = cb;
    return new GitKeep(opt);
  };

  var GitKeep = function(opt){
    this.cb = opt.cb;
    opt.keepFileName = opt.keepFileName || '.gitkeep';
    var err = null;
    try{
      this.touchEmptyKeep(opt.targetDir,opt.keepFileName);
    }catch(e){
      err = e;
    }
    if(typeof opt.callback === 'function'){
      opt.callback(err);
    }
  };


  GitKeep.prototype.touchEmptyKeep =function(targetDir, touchFileName){
    var find = glob.sync(targetDir + '/**');
    var emptyDir = [];
    if(find.length === 0){
      return;
    }
    find.forEach(function(file){
      var stat = fs.statSync(file);
      if(!stat.isDirectory()){
        return;
      }
      var readdir = fs.readdirSync(file);
      if(readdir.length > 0){
        return;
      }
      var touchFile = path.join(file , touchFileName);
      touch.touchSync(touchFile);
    });
    return emptyDir;
  };

  module.exports = gitkeep;
})(module);
