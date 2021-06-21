"use strict";function _toConsumableArray(r){return _arrayWithoutHoles(r)||_iterableToArray(r)||_unsupportedIterableToArray(r)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}function _arrayWithoutHoles(r){if(Array.isArray(r))return _arrayLikeToArray(r)}function _createForOfIteratorHelper(r,e){var t="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!t){if(Array.isArray(r)||(t=_unsupportedIterableToArray(r))||e&&r&&"number"==typeof r.length){t&&(r=t);var n=0,e=function(){};return{s:e,n:function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}},e:function(r){throw r},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,i=!1;return{s:function(){t=t.call(r)},n:function(){var r=t.next();return a=r.done,r},e:function(r){i=!0,o=r},f:function(){try{a||null==t.return||t.return()}finally{if(i)throw o}}}}function _unsupportedIterableToArray(r,e){if(r){if("string"==typeof r)return _arrayLikeToArray(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Map"===(t="Object"===t&&r.constructor?r.constructor.name:t)||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(r,e):void 0}}function _arrayLikeToArray(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function _typeof(r){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}!function(r,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((r=r||self).treeify={})}(void 0,function(r){function p(r){return"function"==typeof r?r(this):r}function e(r,e){function t(r){o.multi?i.push(r):i=r}var n,o=Object.assign({id:"id",parentId:"parentId",children:"children",root:null,multi:!1,deepClone:!1},e),a={},i=[],u=_createForOfIteratorHelper(r);try{for(u.s();!(n=u.n()).done;){var f=n.value;o.deepClone&&(f=function n(o){return Object.keys(o).reduce(function(r,e){var t=o[e];return r[e]=t instanceof Object?n(t):t,r},Array.isArray(o)?[]:{})}(f));var y=p.bind(f),l=f[y(o.id)],c=f[y(o.parentId)];l in a||(a[l]=[]),c in a||(a[c]=[]),f[y(o.children)]=a[l];var d=y(o.root);do{if(o.root||!c)if(o.root){if("boolean"==typeof d&&d||Array.isArray(d)&&d.includes(c)||c===d){t(f);break}}else if(!c){t(f);break}}while(a[c].push(f),0)}}catch(r){u.e(r)}finally{u.f()}return i}function a(r){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"children",o=[];if(!n)throw new Error("The parameter 'childrenName' must be specified.");return(o=Array.isArray(r)?r:[r]).forEach(function(r){var e=p.bind(r)(n),t=r[e];Array.isArray(t)&&t.length&&o.push.apply(o,_toConsumableArray(a(t,e))),delete r[e]}),o}var t={treeify:e,untreeify:a};r.treeify=e,r.untreeify=a,r.default=t,Object.defineProperty(r,"__esModule",{value:!0})});