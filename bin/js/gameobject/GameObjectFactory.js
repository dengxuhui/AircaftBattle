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
    var GameObjectFactory = /** @class */ (function (_super) {
        __extends(GameObjectFactory, _super);
        function GameObjectFactory() {
            var _this = _super.call(this) || this;
            _this._gameObjDic = null;
            _this._objectPoolMap = null;
            _this._objectPoolMap = new Map();
            _this._gameObjDic = new Dictionary();
            _this._gameObjDic.set(GAMEOJB_TYPE.BULLET, gameobject.Bullet);
            return _this;
        }
        GameObjectFactory.instance = function () {
            if (this._instance == null) {
                this._instance = new GameObjectFactory();
            }
            return this._instance;
        };
        GameObjectFactory.prototype.createObject = function (objType, data) {
            if (data === void 0) { data = null; }
            var gameObj = null;
            gameObj = this.findObjInPool(objType);
            if (gameObj == null) {
                var className = this._gameObjDic.get(objType);
                gameObj = new className();
                gameObj.setData(data);
            }
            else {
                // gameObj.ca
                gameObj.setData(data);
            }
            return gameObj;
        };
        GameObjectFactory.prototype.findObjInPool = function (objType) {
            var gameObj = null;
            var gameObjAry = this._objectPoolMap.getValueByKey(objType);
            if (gameObjAry == null || gameObjAry.length <= 0) {
                return null;
            }
            gameObj = gameObjAry.shift();
            return gameObj;
        };
        GameObjectFactory.prototype.dispose = function () {
            this._gameObjDic = null;
        };
        GameObjectFactory._instance = null;
        return GameObjectFactory;
    }(laya.events.EventDispatcher));
    gameobject.GameObjectFactory = GameObjectFactory;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=GameObjectFactory.js.map