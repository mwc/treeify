
treeify.js - v1.0.6（under MIT）
===============================

![Build](https://img.shields.io/badge/build-passing-green.svg)
![Unit Tests](https://img.shields.io/badge/tests-8%20passed-green.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-green.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/treeify-js.svg)
![License](https://img.shields.io/github/license/mwc/treeify.svg)

[English](./readme.md) | [简体中文](./zh-cn.md)

什么是 treeify?
---------------
`treeify.js` 是一个将数组转换为树形对象的工具，数组中的每个元素都有相同的属性。


安装
----
```cmd
$ npm install --save-dev treeify-js
```

CDN
-----
```
[unpkg]  https://unpkg.com/treeify-js
```


生成 & 单元测试
------------
需要在全局位置已经安装了 `gulp` 及 `mocha` 。
通过运行 `$ npm install` 命令，先将所有依赖全部安装。

运行 `build` 脚本开始执行构建， 使用 `test` 脚本执行单元测试。


```cmd
$ npm run build
```

使用说明
-------

假设我们现在有一个数组如下：


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

然后，你需要转换这个数组为下方这样的一个树形对象：

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

你只需要将数组交给 `treeify` 方法：

```javascript
import { treeify } from 'treeify-js'

treeify(arr);
```

然后，你就得到你想要的东西了，易如反掌。

参阅 **`unit tests`** 可以看到更多用法。

尽情自享！

API
---
+ **treeify(data, configure)**

	转换一个数组为树形对象。该数组作为数据源，所有元素必须都是对象，且包含标识对象唯一的 ID 和 父 ID。

	- `data` *Array* - 提供给 treeify 函数的数组类型的数据
	- `configure` *Object* - 配置在转换过程中属性名如何映射。最常见的用法是没有提供任何配置，单就给一个 data 参数。
		* `id`: *string|Function* - 默认值为 "id".
		* `parentId`: *string|Function* - 默认值为 "parentId".
		* `children`: *string|Function* - 默认值为 "children".
		* `root`: *any type* - 直接指定根的值，所谓“根”，是指如果 ID 等于值，就被认为是顶层根节点，这个值可以是任意类型，如果是函数类型并且返回一个数组的话，代表“包含”有多种情况都是根的值，例如 { root: () => ["xxxx"] }，它等同于 { root: () => "xxxx" }，因为仅提供了一个值。默认根的值是 null。
		* `multi`: *boolean* - 如果 'multi' 设为 true，代表它可以有多个根节点，否则根节点仅限一个（默认）。
		* `deepClone`: *boolean* - 是否深拷贝 data 参数的所有数据（为了不影响 data 原数据），默认 false。

+ **untreeify(tree, childrenName)**

	将一棵由 treeify() 生成的树形对象，转回数组形式，这是 treeify 函数的反操作。

	- `tree` *Object* - 从 treeify 生成的对象（或者格式相近的对象）
	- `childrenName` *String|Function* - children 的键名，它可以是一个函数，默认是字符串 **"children"**


License
--------
treeify is under MIT licensed.