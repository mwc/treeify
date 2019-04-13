
treeify.js - v1.0.2（under MIT）
===

What's treeify?
---------------
`treeify.js` is a tool for converting an array which each element contains the same specific rules into an object.

What's New in v1.0.2?
---------------------
- In addition to the first parameter, the other parameters of function treeify are replace by an `object`.
- Add `untreeify()` to convert a tree comes from `treeify()` back into an array.
  `untreeify()` is the inverse of `treeify()`.
- Add `unit tests`

Installation
---
```cmd
$ npm install --save-dev treeify-js
```

Build & Test
---
Packages `gulp` and `mocha` should already be installed globally.
You should also run `$ npm install` first to install all dependencies.

Run the `build` script to build, and the `test` script to run unit test.


```cmd
$ npm run build
```

Usage
---

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
treeify(arr);
```

Then, you get what you want, It's an easy work.

Check the **`unit tests`** to get more usage.

Enjoy!

License
---
treeify is under MIT licensed.