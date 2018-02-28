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
            _this._objectFirstPool = null;
            /**二级缓存用于缓存经常使用的资源，从资源池拿去先从当前资源池拿取 */
            _this._objectSecondPool = null;
            _this._curCacheObjNum = 0;
            _this._objectFirstPool = new Dictionary();
            _this._objectSecondPool = new Dictionary();
            _this._objClassDic = new Dictionary();
            _this._objClassDic.set(GAMEOBJ_TYPE.BULLET, gameobject.Bullet);
            _this._objClassDic.set(GAMEOBJ_TYPE.PANEL, gameobject.AircarftPanel);
            return _this;
        }
        GameObjectFactory.instance = function () {
            if (this._instance == null) {
                this._instance = new GameObjectFactory();
            }
            return this._instance;
        };
        GameObjectFactory.prototype.createObject = function (kindID, typeID, statusID, isSelf, varsData) {
            if (statusID === void 0) { statusID = 0; }
            if (varsData === void 0) { varsData = null; }
            var gameObj = null;
            gameObj = this.findObjInPool(kindID, typeID, statusID);
            if (gameObj == null) {
                var className = this._objClassDic.get(kindID);
                gameObj = new className();
                gameObj.setData(kindID, typeID, statusID, isSelf, varsData);
                gameObj.initialize();
            }
            else {
                gameObj.setData(kindID, typeID, statusID, isSelf, varsData);
                gameObj.initialize();
            }
            return gameObj;
        };
        GameObjectFactory.prototype.disposeObj = function (obj) {
            if (obj == null || obj.kindID < 0) {
                return;
            }
            obj.isWaitForDispose = true;
            if (obj.refCount > 0) {
                var secondObjDic = this._objectSecondPool.get(obj.kindID);
                if (secondObjDic == null) {
                    secondObjDic = new Dictionary();
                    this._objectSecondPool.set(obj.kindID, secondObjDic);
                }
                var secondObjAry = null;
                if (secondObjDic.indexOf(obj.typeID + "_" + obj.statusID) == -1) {
                    secondObjAry = new Array();
                    secondObjAry.push(obj);
                    secondObjDic.set(obj.typeID + "_" + obj.statusID, secondObjAry);
                }
                else {
                    secondObjAry = secondObjDic.get(obj.typeID + "_" + obj.statusID);
                    secondObjAry.push(obj);
                }
            }
            else {
                var firstObjDic = this._objectFirstPool.get(obj.kindID);
                if (firstObjDic == null) {
                    firstObjDic = new Dictionary();
                    this._objectFirstPool.set(obj.kindID, firstObjDic);
                }
                var firstObjAry = null;
                if (firstObjDic.indexOf(obj.typeID + "_" + obj.statusID) == -1) {
                    firstObjAry = new Array();
                    firstObjAry.push(obj);
                    firstObjDic.set(obj.typeID + "_" + obj.statusID, firstObjAry);
                }
                else {
                    firstObjAry = firstObjDic.get(obj.typeID + "_" + obj.statusID);
                    firstObjAry.push(obj);
                }
            }
            this._curCacheObjNum += 1;
            if (obj.parent != null) {
                console.log("未删除");
            }
            if (this._curCacheObjNum >= GameObjectFactory.MAX_CACHE_NUM) {
                this.cleanCachePool();
            }
        };
        /*清理资源池 清理所有一级缓存* */
        GameObjectFactory.prototype.cleanCachePool = function () {
            var i = 0;
            for (i = 0; i < this._objectFirstPool.values.length; i++) {
                var objDic = this._objectFirstPool.values[i];
                if (objDic == null) {
                    console.assert(false, "数组为空");
                    continue;
                }
                if (objDic.values.length <= 0) {
                    continue;
                }
                for (var j = 0; j < objDic.values.length; j++) {
                    var objAry = objDic.values[j];
                    if (objAry == null || objAry.length <= 0) {
                        continue;
                    }
                    for (var k = 0; k < objAry.length; k++) {
                        var obj = objAry[k];
                        if (obj == null) {
                            continue;
                        }
                        obj.dispose();
                        obj = null;
                        this._curCacheObjNum -= 1;
                    }
                    objAry.splice(0, objAry.length);
                }
            }
            if (this._curCacheObjNum >= GameObjectFactory.MAX_CACHE_NUM) {
                this.deepCleanCachePool();
            }
        };
        /**深度清理二级缓存 一般是不存在这种情况*/
        GameObjectFactory.prototype.deepCleanCachePool = function () {
        };
        GameObjectFactory.prototype.findObjInPool = function (kindID, typeID, statusID) {
            var gameObj = null;
            var gameFirstObjDic = this._objectFirstPool.get(kindID);
            var gameSecondObjDic = this._objectSecondPool.get(kindID);
            if ((gameSecondObjDic == null || gameSecondObjDic.values.length <= 0) && (gameFirstObjDic == null || gameFirstObjDic.values.length <= 0)) {
                return null;
            }
            var gameObjAry = null;
            if (gameSecondObjDic != null && gameSecondObjDic.values.length > 0) {
                if (gameSecondObjDic.indexOf(typeID + "_" + statusID) != -1) {
                    gameObjAry = gameSecondObjDic.get(typeID + "_" + statusID);
                    if (gameObjAry != null && gameObjAry.length > 0) {
                        gameObj = gameObjAry.shift();
                    }
                }
                if (gameObj == null) {
                    gameObjAry = gameFirstObjDic.get(typeID + "_" + statusID);
                    if (gameObjAry != null && gameObjAry.length > 0) {
                        gameObj = gameObjAry.shift();
                    }
                }
            }
            else if (gameFirstObjDic != null && gameFirstObjDic.values.length > 0) {
                gameObjAry = gameFirstObjDic.get(typeID + "_" + statusID);
                if (gameObjAry != null && gameObjAry.length > 0) {
                    gameObj = gameObjAry.shift();
                }
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