'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.treeify = factory();
})(undefined, function () {
    'use strict';

    /*!
     * treeify.js v0.0.1 - 2018/4
     * 
     * 数组转换为树形结构对象
     * 
     * Copyright (C) mwc@foxmail.com
     * 2018-present.
     */

    /**
     * 数组转换为树形结构对象
     * 
     * 作为数据源的数组，其元素必须为对象，对象保存着当前唯一的id（或其他唯一标识符），
     * 以及其父id；
     * 
     * 这两项属性是 treeify() 必须的。
     * 
     * 若非默认属性名，可通过 idKey、parentIdKey 提供指定的名称；
     * 
     * childrenName 参数提供的名称字符串，用于给元素创建其子元素数组的属性名，
     * 若未设置则默认为 'children'，如：
     * 
     * { id: 'a1', parentId: 'a', children: [] }
     * 
     * 可通过自定义子元素集合的属性名称，如使用 'child'：
     * 
     * treeify([...], 'id', 'parentId', 'child');
     * 
     * // 结果：  { id: 'a1', parentId: 'a', child: [] }
     * 
     * @param {Array} data 数据的一维数组
     * @param {string} idKey 代表id的键名，默认为 id
     * @param {string} parentIdKey 代表父id的键名，默认为 parentId
     * @param {string} childrenName 存放子对象的属性名，默认为 children
     */

    function treeify(data) {
        var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
        var parentIdKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'parentId';
        var childrenName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';

        var disposable = {}; // 临时对象
        var root = void 0; // 根节点
        var parentId = void 0; // 父id
        var id = void 0; // 当前元素id

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                id = item[idKey];
                parentId = item[parentIdKey];

                if (!(id in disposable)) {
                    disposable[id] = [];
                }

                if (!(parentId in disposable)) {
                    disposable[parentId] = [];
                }

                item[childrenName] = disposable[id];

                if (parentId) {
                    disposable[parentId].push(item);
                } else {
                    root = item;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return root;
    }

    return treeify;
});