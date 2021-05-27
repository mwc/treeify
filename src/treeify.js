/*!
 * treeify.js
 *
 * Convert an array to a tree object.
 * 
 * Copyright (C) mwc@foxmail.com
 */

function executeIfFunction(f) {
	return typeof f === "function" ? f(this) : f
}

function deepClone(o) {
	return Object.keys(o).reduce((target, key) => {
		let value = o[key]
		target[key] = value instanceof Object ? deepClone(value) : value
		return target
	}, Array.isArray(o) ? [] : {})
}

/**
 * Convert an array to a tree object.
 * 
 * Note: An array which as data source, all element of it must be an object that has an unique ID and a parent's ID.
 * 
 * @param {Array}   data        Give a data source to treeify
 * @param {Object}  configure   Configure keys name mapping in convertion
 */
export function treeify(data, configure) {
	const config = Object.assign(
		{
			id: "id",
			parentId: "parentId",
			children: "children",
			root: null,
			multi: false,           // If the 'multi' is set to TRUE, it can have multiple roots, FALSE can only have one.
			deepClone: false        // Whether deep clone all elements of data in convert.
		},
		configure
	)

	const disposable = {}   // an object which is temp used.

	let roots = []          // Root node
	const setRoots = (el) => {
		if (config.multi) {
			roots.push(el)
		} else {
			roots = el
		}
	}

	let id                  // ID of current element
	let parentId            // parent ID of current element

	for (let el of data) {
		if (config.deepClone) {
			el = deepClone(el)
		}

		const f = executeIfFunction.bind(el)

		id = el[f(config.id)]
		parentId = el[f(config.parentId)]

		if (!(id in disposable)) {
			disposable[id] = []
		}

		if (!(parentId in disposable)) {
			disposable[parentId] = []
		}

		el[f(config.children)] = disposable[id]

		const root = f(config.root)

		do {
			if (config.root || !parentId) {
				if (config.root) {
					if ((typeof root == "boolean" && root) ||
						(Array.isArray(root) && root.includes(parentId)) ||
						(parentId === root)
					) {
						setRoots(el)
						break
					}
				} else if (!parentId) {
					setRoots(el)
					break
				}
			}

			disposable[parentId].push(el)
		} while (false)
	}

	return roots
}

/**
 * Convert a tree from treeify() back into an array.
 * This is the inverse of treeify.
 * 
 * @param {Object} tree             A tree comes from treeify
 * @param {String} childrenName     Give the children's key name, it can also be a function.
 */
export function untreeify(tree, childrenName = "children") {
	let result = []

	if (!childrenName) {
		throw new Error("The parameter 'childrenName' must be specified.")
	}

	if (Array.isArray(tree)) {
		result = tree
	} else {
		result = [tree]
	}

	result.forEach(item => {
		const childKey = executeIfFunction.bind(item)(childrenName)
		const children = item[childKey]

		if (Array.isArray(children) && children.length) {
			result.push(...untreeify(children, childKey))
		}

		delete item[childKey]
	})

	return result
}

export default { treeify, untreeify }