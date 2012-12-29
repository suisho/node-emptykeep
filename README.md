# node-gitkeep
create .gitkeep file to empty directory
touchgitkeep
## usage
```js
var gitkeep = require('gitkeep');
gitkeep('./project_dir');
```
if you want change touch file
```js
var gitkeep = require('gitkeep');
gitkeep('./project_dir',{
  keepFileName : "keepme"
});
```
