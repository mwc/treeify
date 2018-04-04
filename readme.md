
treeify.js - v0.0.3（MIT）
===

What's treeify?
---
`treeify.js` is a tool for converting an array (each element contains the same specific rules) into an object.

treeify 是将一个数组（每个元素包含相同的特定的规则）转换为一个对象的工具。


Constructor Parameters
---
```javascript
treeify(data, idKey = 'id', parentIdKey = 'parentId', childrenName = 'children')
```

- `data` {Array} 一个一维数组，该数组中每个元素均必须是一个对象，对象至少包含两个属性：
    - 唯一id的属性，如名称为 "id" 的属性；
    - 指向父级id的属性，如名称为 "parentId" 的属性。
- `idKey` {string} 标识元素中哪个属性是代表唯一id的名称，默认为 "id"
- `parentIdKey` {string} 标识元素中哪个属性是代表指向父元素的id，默认为 "parentId"
- `childrenName` {string} 默认情况下将向元素添加一个名为 'children' 的属性，代表当前元素的子级。可通过此参数修改这个名称。

Installation
---
```cmd
$ npm install --save-dev treeify-js
```

Build
---
```cmd
$ npm run build
```

Usage
---

You have an array now:


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

You just need to write this :

```javascript
treeify(arr);
```

Enjoy!

License
---
treeify is MIT licensed.