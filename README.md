# emptykeep

Create keep file (default is .gitkeep) file to empty directory
touchgitkeep

## usage

```js
var emptykeep = require('emptykeep');
emptykeep('./project_dir');
```

if you want change touch file name

```js
var emptykeep = require('emptykeep');
emptykeep('./project_dir',{
  keepFileName : "keepme"
});
```
