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
export default function treeify(data, idKey = 'id', parentIdKey = 'parentId', childrenName = 'children') {
    const disposable = {}; // 临时对象
    let root; // 根节点
    let parentId; // 父id
    let id; // 当前元素id

    for (let item of data) {
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

    return root;
}