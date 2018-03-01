var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var gameobject;
(function (gameobject) {
    var Sprite = Laya.Sprite;
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        function GameObject() {
            var _this = _super.call(this) || this;
            /**是否是自己 如果不是自己飞行方向会反向 */
            _this._isSelf = false;
            _this._canCache = false;
            _this._kindID = -1;
            _this._typeID = -1;
            _this._statusID = -1;
            _this._layerType = LAYER.MAIN;
            _this._varsData = null;
            _this._uID = -1;
            /**引用计数 */
            _this._refCount = 0;
            _this._isWaitForDispose = false;
            _this.pivot(0, 0);
            return _this;
        }
        GameObject.prototype.setData = function (uID, kindID, typeID, statusID, isSelf, varsData) {
            if (statusID === void 0) { statusID = 0; }
            if (varsData === void 0) { varsData = null; }
            this._kindID = kindID;
            this._typeID = typeID;
            this._statusID = statusID;
            this._isSelf = isSelf;
            this._varsData = varsData;
            this._uID = uID;
        };
        Object.defineProperty(GameObject.prototype, "uID", {
            get: function () {
                return this._uID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "kindID", {
            get: function () {
                return this._kindID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "typeID", {
            get: function () {
                return this._typeID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "statusID", {
            get: function () {
                return this._statusID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "varsData", {
            get: function () {
                return this._varsData;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.initialize = function () {
        };
        GameObject.prototype.uninitialize = function () {
        };
        GameObject.prototype.dispose = function () {
        };
        Object.defineProperty(GameObject.prototype, "isWaitForDispose", {
            get: function () {
                return this._isWaitForDispose;
            },
            set: function (value) {
                this._isWaitForDispose = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "refCount", {
            get: function () {
                return this._refCount;
            },
            set: function (value) {
                this._refCount = value;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.ATLAS_FLAG = "gameobject";
        return GameObject;
    }(Sprite));
    gameobject.GameObject = GameObject;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=GameObject.js.map