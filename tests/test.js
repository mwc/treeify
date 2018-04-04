var treeify = require('../build/treeify');
var mocha = require('mocha');
var assert = require('chai').assert;

let arr = [{
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

describe('treeify', function () {
    it('normal', function () {
        assert.deepEqual(treeify(arr), {
            "id": "a",
            "parentId": "",
            "children": [{
                "id": "a1",
                "parentId": "a",
                "children": [{
                    "id": "a1-1",
                    "parentId": "a1",
                    "children": []
                }]
            }, {
                "id": "a2",
                "parentId": "a",
                "children": [{
                    "id": "aq",
                    "parentId": "a2",
                    "children": []
                }]
            }]
        });
    });
});