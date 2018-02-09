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
            return _this;
        }
        GameObject.prototype.setData = function (data) {
            this._data = data;
        };
        GameObject.prototype.initialize = function () {
            // addEventListener()
        };
        GameObject.prototype.uninitialize = function () {
        };
        GameObject.prototype.cancelDispose = function () {
            this.event(gameobject.GameObjectEvent.CANCEL_DISPOSE);
        };
        GameObject.prototype.dispose = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            if (!this._isWaitForDispose) {
                return;
            }
        };
        return GameObject;
    }(Sprite));
    gameobject.GameObject = GameObject;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=GameObject.js.map