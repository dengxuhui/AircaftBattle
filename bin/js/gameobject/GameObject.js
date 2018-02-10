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
            _this._isWaitForDispose = false;
            _this._data = null;
            _this._layerType = LAYER.MAIN;
            _this._gameObjType = -1;
            /**引用计数 */
            _this._refCount = 0;
            return _this;
        }
        GameObject.prototype.setData = function (data) {
            this._data = data;
        };
        GameObject.prototype.initialize = function () {
            this.on(gameobject.GameObjectEvent.REQUEST_DISPOSE, this, this.onObjRequestDispose);
            this.on(gameobject.GameObjectEvent.CANCEL_DISPOSE, this, this.onOjbCancelDispose);
        };
        GameObject.prototype.uninitialize = function () {
            this.off(gameobject.GameObjectEvent.REQUEST_DISPOSE, this, this.onObjRequestDispose);
            this.off(gameobject.GameObjectEvent.CANCEL_DISPOSE, this, this.onOjbCancelDispose);
        };
        GameObject.prototype.onObjRequestDispose = function () {
        };
        GameObject.prototype.onOjbCancelDispose = function () {
        };
        GameObject.prototype.cancelDispose = function () {
            this.event(gameobject.GameObjectEvent.CANCEL_DISPOSE, { objType: this._gameObjType });
        };
        GameObject.prototype.dipatchDisposeEvent = function () {
            this.event(gameobject.GameObjectEvent.DISPOSE, { ojbType: this._gameObjType });
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
        Object.defineProperty(GameObject.prototype, "gameObjType", {
            get: function () {
                return this._gameObjType;
            },
            set: function (value) {
                this._gameObjType = value;
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
        return GameObject;
    }(Sprite));
    gameobject.GameObject = GameObject;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=GameObject.js.map