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
            _this._objClassDic = null;
            /**一级缓存用于缓存只被用了一次的资源 */
            _this._objectFirstPoolMap = null;
            /**二级缓存用于缓存经常使用的资源，从资源池拿去先从当前资源池拿取 */
            _this._objectSecondPoolMap = null;
            _this._curCacheObjNum = 0;
            _this._objectFirstPoolMap = new Map();
            _this._objectSecondPoolMap = new Map();
            _this._objClassDic = new Dictionary();
            _this._objClassDic.set(GAMEOJB_TYPE.BULLET, gameobject.Bullet);
            _this._objClassDic.set(GAMEOJB_TYPE.PANEL, gameobject.AircarftPanel);
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
                var className = this._objClassDic.get(objType);
                gameObj = new className();
                gameObj.setData(data);
                gameObj.gameObjType = objType;
            }
            else {
                gameObj.setData(data);
            }
            return gameObj;
        };
        GameObjectFactory.prototype.disposeObj = function (obj, objType) {
            if (obj == null || objType < 0) {
                return;
            }
            obj.isWaitForDispose = true;
            if (obj.refCount > 0) {
                var secondObjAry = this._objectSecondPoolMap.getValueByKey(objType);
                if (secondObjAry == null) {
                    // console.assert(false,"野资源");
                    secondObjAry = new Array();
                    this._objectSecondPoolMap.addValue(objType, secondObjAry);
                }
                secondObjAry.push(obj);
            }
            else {
                var firstObjAry = this._objectFirstPoolMap.getValueByKey(objType);
                if (firstObjAry == null) {
                    firstObjAry = new Array();
                    this._objectFirstPoolMap.addValue(objType, firstObjAry);
                }
                firstObjAry.push(obj);
            }
            this._curCacheObjNum += 1;
            if (this._curCacheObjNum >= GameObjectFactory.MAX_CACHE_NUM) {
                this.cleanCachePool();
            }
        };
        /*清理资源池 清理所有一级缓存* */
        GameObjectFactory.prototype.cleanCachePool = function () {
            var i = 0;
            for (i = 0; i < this._objectFirstPoolMap.length; i++) {
                var objAry = this._objectFirstPoolMap.getValueByIndex(i);
                if (objAry == null) {
                    console.assert(false, "数组为空");
                    continue;
                }
                if (objAry.length <= 0) {
                    continue;
                }
                for (var j = 0; j < objAry.length; j++) {
                    var obj = objAry[j];
                    if (obj == null) {
                        continue;
                    }
                    obj.dispose();
                    obj = null;
                    this._curCacheObjNum -= 1;
                }
                objAry.splice(0, objAry.length);
            }
            if (this._curCacheObjNum >= GameObjectFactory.MAX_CACHE_NUM) {
                this.deepCleanCachePool();
            }
        };
        /**深度清理二级缓存 一般是不存在这种情况*/
        GameObjectFactory.prototype.deepCleanCachePool = function () {
        };
        GameObjectFactory.prototype.findObjInPool = function (objType) {
            var gameObj = null;
            var gameFirstObjAry = this._objectFirstPoolMap.getValueByKey(objType);
            var gameSecondObjAry = this._objectSecondPoolMap.getValueByKey(objType);
            if ((gameSecondObjAry == null || gameSecondObjAry.length <= 0) && (gameFirstObjAry == null || gameFirstObjAry.length <= 0)) {
                return null;
            }
            if (gameSecondObjAry != null && gameSecondObjAry.length > 0) {
                gameObj = gameSecondObjAry.shift();
            }
            else if (gameFirstObjAry != null && gameFirstObjAry.length > 0) {
                gameObj = gameFirstObjAry.shift();
            }
            if (gameObj == null) {
                return null;
            }
            gameObj.isWaitForDispose = false;
            gameObj.refCount += 1;
            this._curCacheObjNum -= 1;
            return gameObj;
        };
        GameObjectFactory.prototype.dispose = function () {
            this._objClassDic = null;
        };
        GameObjectFactory._instance = null;
        GameObjectFactory.MAX_CACHE_NUM = 1000;
        return GameObjectFactory;
    }(laya.events.EventDispatcher));
    gameobject.GameObjectFactory = GameObjectFactory;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=GameObjectFactory.js.map