var path = require("path");
var fs = require("fs-extra");
var assert = require("assert");
var gitkeep = require("../");
var fixture = "test/fixture";
var touch = require("touch");

function setupFixture(dir){
  fs.mkdirsSync(dir+"/empty");
  fs.mkdirsSync(dir+"/not_empty");
  touch.sync(dir+"/not_empty/foo.txt");
  fs.mkdirsSync(dir+"/tree/tree/empty");
  fs.mkdirsSync(dir+"/tree/tree/not_empty");
  touch.sync(dir+"/tree/tree/not_empty/foo.txt");
}

describe('keep', function () {
  beforeEach(function (done) {
    try{ fs.removeSync(fixture); }catch(e){}
    setupFixture(fixture);
    done();
  });
  it('Finding', function (done) {
    // test!
    gitkeep(fixture,function(){
      assert.ok(fs.existsSync("./test/fixture/empty/.gitkeep"));
      assert.ok(!fs.existsSync("./test/fixture/not_empty/.gitkeep"));
      assert.ok(fs.existsSync("./test/fixture/tree/tree/empty/.gitkeep"));
      assert.ok(!fs.existsSync("./test/fixture/tree/tree/not_empty/.gitkeep"));
      done();
    });
  });
  it('Name option', function (done) {
    var opt = {
      keepFileName : "keepme"
    };
    // test!
    gitkeep(fixture,opt,function(){
      assert.ok(fs.existsSync("./test/fixture/empty/keepme"));
      assert.ok(!fs.existsSync("./test/fixture/not_empty/keepme"));
      assert.ok(fs.existsSync("./test/fixture/tree/tree/empty/keepme"));
      assert.ok(!fs.existsSync("./test/fixture/tree/tree/not_empty/.keepme"));
      done();
    });
  });
  after(function (done) {
    try{ fs.removeSync(fixture); }catch(e){console.log(e);}
    done();
  });
});
