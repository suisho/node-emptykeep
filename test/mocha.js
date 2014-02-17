'use strict';

var path    = require("path");
var fs      = require("fs-extra");
var assert  = require("assert");
var emptykeep = require("../");
var touch   = require("touch");
function setupFixture(dir){
  fs.mkdirsSync(dir+"/empty");
  fs.mkdirsSync(dir+"/not_empty");
  touch.sync(dir+"/not_empty/foo.txt");
  fs.mkdirsSync(dir+"/tree/tree/empty");
  fs.mkdirsSync(dir+"/tree/tree/not_empty");
  touch.sync(dir+"/tree/tree/not_empty/foo.txt");
}
function _assert(dir, name){
  name = name || ".gitkeep";
  assert.ok(fs.existsSync(path.join(dir, '/empty/'+name)))
  assert.ok(!fs.existsSync(path.join(dir,'/not_empty/'+name)))
  assert.ok(fs.existsSync(path.join(dir, '/tree/tree/empty/'+name)))
  assert.ok(!fs.existsSync(path.join(dir,'/tree/tree/not_empty/'+name)))
}

function successTest(fixture){
  describe('test dir '+ fixture, function () {
    beforeEach(function (done) {
      try{ fs.removeSync(fixture); }catch(e){}
      setupFixture(fixture);
      done();
    });
    it('Finding', function (done) {
      emptykeep(fixture,function(){
        _assert(fixture)
        done();
      });
    });
    it('array', function (done) {
      done();
      emptykeep([fixture], function(){
        _assert(fixture)
        done();
      });
    });
    it('Name option', function (done) {
      var opt = {
        keepFileName : "keepme"
      };
      emptykeep(fixture,opt,function(){
        _assert(fixture, "keepme")
        done();
      });
    });
    after(function (done) {
      try{ fs.removeSync(fixture); }catch(e){console.log(e);}
      done();
    });
  });
}

setupFixture("./test/fixture")

successTest("./test/fixture");
successTest("test/fixture")
successTest("test/fixture/");
successTest(path.resolve("test/fixture"));

