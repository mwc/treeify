import { untreeify, treeify } from "../src/treeify.js"
import { assert } from "chai"

describe("untreeify", () => {
	let data_common = [
		{ id: "a1", parentId: "a" },
		{ id: "aq", parentId: "a2" },
		{ id: "a2", parentId: "a" },
		{ id: "a1-1", parentId: "a1" },
		{ id: "a", parentId: "" }
	]

	it("should return an array when untreeify get a tree object parameter.", () => {
		assert.deepEqual(untreeify(treeify(data_common)),
			[
				{
					id: "a",
					parentId: ""
				},
				{
					id: "a1",
					parentId: "a"
				},
				{
					id: "a2",
					parentId: "a"
				},
				{
					id: "a1-1",
					parentId: "a1"
				},
				{
					id: "aq",
					parentId: "a2"
				}
			]
		)

		let data_set_chidlren_key = [
			{ id: "a1", parentId: "a" },
			{ id: "aq", parentId: "a2" },
			{ id: "a2", parentId: "a" },
			{ id: "a1-1", parentId: "a1" },
			{ id: "a", parentId: "" }
		]

		// specify children's name
		assert.deepEqual(
			untreeify(
				treeify(data_set_chidlren_key, { children: "__child" }),
				"__child"
			),
			[
				{
					id: "a",
					parentId: ""
				},
				{
					id: "a1",
					parentId: "a"
				},
				{
					id: "a2",
					parentId: "a"
				},
				{
					id: "a1-1",
					parentId: "a1"
				},
				{
					id: "aq",
					parentId: "a2"
				}
			]
		)
	})
})