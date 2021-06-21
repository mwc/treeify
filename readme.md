
treeify.js - v1.0.8（under MIT）
===============================

![Build](https://img.shields.io/badge/build-passing-green.svg)
![Unit Tests](https://img.shields.io/badge/tests-8%20passed-green.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-green.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/treeify-js.svg)
![License](https://img.shields.io/github/license/mwc/treeify.svg)

[English](./readme.md) | [简体中文](./zh-cn.md)

What's treeify?
---------------
`treeify.js` is a tool for converting an array which each element contains the same specific rules into an object.


Installation
------------
```cmd
$ npm install --save-dev treeify-js
```

CDN
-----
```
[unpkg]  https://unpkg.com/treeify-js
```


Build & Test
------------
Packages `gulp` and `mocha` should already be installed globally.
You should also run `$ npm install` first to install all dependencies.

Run the `build` script to build, and the `test` script to run unit test.


```cmd
$ npm run build
```

Usage
-----

So, now we have an array:


```javascript

var arr = [
    {
        id: 'a1',
        parentId: 'a'
    },
    {
        id: 'aq',
        parentId: 'a2'
    },
    {
        id: 'a2',
        parentId: 'a'
    },
    {
        id: 'a1-1',
        parentId: 'a1'
    },
    {
        id: 'a',
        parentId: ''
    }
];
```

Then, You need to convert to such a tree object:

```javascript

    {
        id: 'a',
        parentId: '',
        children: [
            {
                id: 'a1',
                parentId: 'a',
                children: [
                    {
                        id: 'a1-1',
                        parentId: 'a1',
                        children: []
                    }
                ]
            },
            {
                id: 'a2',
                parentId: 'a',
                children: [
                    {
                        id: 'aq',
                        parentId: 'a2',
                        children: []
                    }
                ]
            }
        ]
    }
    
```

You just need to give the array to treeify:

```javascript
import { treeify } from 'treeify-js'

treeify(arr);
```

Then, you get what you want, It's an easy work.

Check the **`unit tests`** to get more usage.

Enjoy!

API
---
+ **treeify(data, configure)**

	Convert an array to a tree object. An array which as data source, all element of it must be an object that has an unique ID and a parent's ID.

	- `data` *Array* - Give a data which Array type to treeify
	- `configure` *Object* - A Object that Configure keys name mapping in convertion. The most common usage is no any configuration, just give the data along.
		* `id`: *string|Function* - default value is "id".
		* `parentId`: *string|Function* - default value is "parentId".
		* `children`: *string|Function* - default value is "children".
		* `root`: *any type* - specify a value directly, the value can be any type, if return a value which an array type, it means 'contains', such as { root: () => ["xxxx"] }, it is the same as { root: () => "xxxx" } if only one value is returned. default value is null.
		* `multi`: *boolean* - If the 'multi' is set * to TRUE, it can have multiple roots, FALSE can only have one, default value is false.
		* `deepClone`: *boolean* - Whether deep clone all elements of data in convert, default value is false.

+ **untreeify(tree, childrenName)**

	Convert a tree from treeify() back into an array. This is the inverse of treeify.

	- `tree` *Object* - A tree comes from treeify
	- `childrenName` *String|Function* - Give the children's key name, it can also be a function. default value is **"children"**


License
--------
treeify is under MIT licensed.