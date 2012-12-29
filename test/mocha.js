var path = require("path");
var fs = require("fs-extra");
var assert = require("assert");
var gitkeep = require("../");
describe('keep', function () {
  beforeEach(function (done) {
    try{ fs.removeSync("fixture"); }catch(e){}
    fs.copy("fixture_base","fixture", function(){
      done();
    });
  });
  it('Finding', function (done) {
    // test!
    gitkeep("fixture",function(){
      assert.ok(fs.existsSync("./fixture/empty/.gitkeep"));
      assert.ok(!fs.existsSync("./fixture/not_empty/.gitkeep"));
      assert.ok(fs.existsSync("./fixture/tree/tree/empty/.gitkeep"));
      assert.ok(!fs.existsSync("./fixture/tree/tree/not_empty/.gitkeep"));
      done();
    });
  });
  it('Name option', function (done) {
    var opt = {
      keepFileName : "keepme"
    };
    // test!
    gitkeep("fixture",opt,function(){
      assert.ok(fs.existsSync("./fixture/empty/keepme"));
      assert.ok(!fs.existsSync("./fixture/not_empty/keepme"));
      assert.ok(fs.existsSync("./fixture/tree/tree/empty/keepme"));
      assert.ok(!fs.existsSync("./fixture/tree/tree/not_empty/.keepme"));
      done();
    });
  });
  after(function (done) {
    try{ fs.removeSync("fixture"); }catch(e){console.log(e);}
    done();
  });
});
