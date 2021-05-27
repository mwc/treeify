const { treeify } = require("../build/treeify")
const { assert } = require("chai")

describe("treeify", () => {
	let data_common = [
		{ id: "a1", parentId: "a" },
		{ id: "aq", parentId: "a2" },
		{ id: "a2", parentId: "a" },
		{ id: "a1-1", parentId: "a1" },
		{ id: "a", parentId: "" }
	]

	it("common usage", () => {
		// The most common usage is no any configuration.
		// Just give the data along.
		assert.deepEqual(
			treeify(data_common),
			{
				"id": "a",
				"parentId": "",
				"children": [
					{
						"id": "a1",
						"parentId": "a",
						"children": [
							{
								"id": "a1-1",
								"parentId": "a1",
								"children": []
							}
						]
					},
					{
						"id": "a2",
						"parentId": "a",
						"children": [
							{
								"id": "aq",
								"parentId": "a2",
								"children": []
							}
						]
					}
				]
			}
		)
	})

	let data_with_parameter = [
		{ _id: "a1", pid: "a" },
		{ _id: "aq", pid: "a2" },
		{ _id: "a2", pid: "a" },
		{ _id: "a1-1", pid: "a1" },
		{ _id: "a", pid: null }
	]

	it("with configuration > specify key names", () => {
		assert.deepEqual(
			treeify(data_with_parameter, { id: "_id", parentId: "pid", children: "child" }),
			{
				"_id": "a",
				"pid": null,
				"child": [
					{
						"_id": "a1",
						"pid": "a",
						"child": [
							{
								"_id": "a1-1",
								"pid": "a1",
								"child": []
							}
						]
					},
					{
						"_id": "a2",
						"pid": "a",
						"child": [
							{
								"_id": "aq",
								"pid": "a2",
								"child": []
							}
						]
					}
				]
			}
		)
	})

	let data_with_parameter_by_func = [
		{ _id: "a1", _parentId: "a" },
		{ _id: "aq", _parentId: "a2" },
		{ _id: "a2", _parentId: "a" },
		{ _id: "a1-1", _parentId: "a1" },
		{ _id: "a", _parentId: undefined }
	]

	it("with configuration > specify key names by function", () => {
		assert.deepEqual(
			treeify(data_with_parameter_by_func, { id: () => "_id", parentId: () => "_parentId" }),
			{
				"_id": "a",
				"_parentId": undefined,
				"children": [
					{
						"_id": "a1",
						"_parentId": "a",
						"children": [
							{
								"_id": "a1-1",
								"_parentId": "a1",
								"children": []
							}
						]
					},
					{
						"_id": "a2",
						"_parentId": "a",
						"children": [
							{
								"_id": "aq",
								"_parentId": "a2",
								"children": []
							}
						]
					}
				]
			}
		)
	})

	let data_root = [
		{ id: "a1", parentId: "a" },
		{ id: "aq", parentId: "a2" },
		{ id: "a2", parentId: "a" },
		{ id: "a1-1", parentId: "a1" },
		{ id: "a", parentId: "000000" }
	]

	it("with configuration > specify root value", () => {
		assert.deepEqual(
			treeify(data_root, { root: "000000" }),
			{
				"id": "a",
				"parentId": "000000",
				"children": [
					{
						"id": "a1",
						"parentId": "a",
						"children": [
							{
								"id": "a1-1",
								"parentId": "a1",
								"children": []
							}
						]
					},
					{
						"id": "a2",
						"parentId": "a",
						"children": [
							{
								"id": "aq",
								"parentId": "a2",
								"children": []
							}
						]
					}
				]
			}
		)
	})

	let data_root_by_func = () => [
		{ id: "a1", parentId: "a" },
		{ id: "aq", parentId: "a2" },
		{ id: "a2", parentId: "a" },
		{ id: "a1-1", parentId: "a1" },
		{ id: "a", parentId: "xxxx" }
	]

	it("with configuration > specify root value by function", () => {
		// specify a value directly, value can be any type.
		// if return a value which an array type, it means 'contains'.
		// such as { root: () => ["xxxx"] },
		// it is the same as { root: () => "xxxx" } if only one value is returned.
		assert.deepEqual(
			treeify(data_root_by_func(), { root: () => "xxxx" }),
			{
				"id": "a",
				"parentId": "xxxx",
				"children": [
					{
						"id": "a1",
						"parentId": "a",
						"children": [
							{
								"id": "a1-1",
								"parentId": "a1",
								"children": []
							}
						]
					},
					{
						"id": "a2",
						"parentId": "a",
						"children": [
							{
								"id": "aq",
								"parentId": "a2",
								"children": []
							}
						]
					}
				]
			}
		)

		// The 'xxxx' and 'wwww' values in the array are considered to be allowed as root values.
		// In the case of both parent ids in the data, only the last root element is used,
		// but the 'multi' configuration can be used to specify that multiple root elements are allowed.
		assert.deepEqual(
			treeify(data_root_by_func(), { root: () => ["xxxx", "wwww"] }),
			{
				"id": "a",
				"parentId": "xxxx",
				"children": [
					{
						"id": "a1",
						"parentId": "a",
						"children": [
							{
								"id": "a1-1",
								"parentId": "a1",
								"children": []
							}
						]
					},
					{
						"id": "a2",
						"parentId": "a",
						"children": [
							{
								"id": "aq",
								"parentId": "a2",
								"children": []
							}
						]
					}
				]
			}
		)

		// specify a condition that will return a value that boolean type.
		// if return true, the item is root element.
		assert.deepEqual(
			treeify(data_root_by_func(), { root: item => item.parentId === "xxxx" }),
			{
				"id": "a",
				"parentId": "xxxx",
				"children": [
					{
						"id": "a1",
						"parentId": "a",
						"children": [
							{
								"id": "a1-1",
								"parentId": "a1",
								"children": []
							}
						]
					},
					{
						"id": "a2",
						"parentId": "a",
						"children": [
							{
								"id": "aq",
								"parentId": "a2",
								"children": []
							}
						]
					}
				]
			}
		)
	})

	let data_multi_roots = () => [
		{ id: "a1", parentId: "a" },
		{ id: "a" },
		{ id: "b1", parentId: "b" },
		{ id: "b", parentId: "b_root" },
		{ id: "c1", parentId: "c" },
		{ id: "c", parentId: "c_root" }
	]

	// In the case of multi configuration, treeify will return an array that includes multipe roots.
	it("with configuration > multi roots", () => {
		// should return the last tree if no configure multi to true
		assert.deepEqual(
			treeify(data_multi_roots(), { root: item => [, "b_root", "c_root"] }),
			{
				id: "c",
				parentId: "c_root",
				children: [
					{ id: "c1", parentId: "c", children: [] }
				]
			}
		)

		// In case of 'multi', should return an array that includes multipe roots.
		assert.deepEqual(
			treeify(data_multi_roots(), { multi: true, root: item => [, "b_root", "c_root"] }),
			[
				{
					id: "a",
					children: [
						{ id: "a1", parentId: "a", children: [] }
					]
				},
				{
					id: "b",
					parentId: "b_root",
					children: [
						{ id: "b1", parentId: "b", children: [] }
					]
				},
				{
					id: "c",
					parentId: "c_root",
					children: [
						{ id: "c1", parentId: "c", children: [] }
					]
				}
			]
		)
	})

	let data_deep_clone = () => [
		{ id: "a1", parentId: "a" },
		{ id: "a" }
	]

	it("with configuration > deep clone the data", () => {
		// By default, deepClone = false
		let data_default = data_deep_clone()
		assert.strictEqual(
			treeify(data_default),
			data_default[1]
		)

		// if set deepClone = true, all elements will deep clone.
		let data_clone = data_deep_clone()
		assert.notStrictEqual(
			treeify(data_clone, { deepClone: true }),
			data_default[1]
		)
	})
})