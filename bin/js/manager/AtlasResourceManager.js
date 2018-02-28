/**
* name
*/
var manager;
(function (manager) {
    var AtlasResourceManager = /** @class */ (function () {
        function AtlasResourceManager() {
            this._curLoadAtlasDic = new Dictionary();
        }
        Object.defineProperty(AtlasResourceManager, "Instance", {
            /**获取实例 */
            get: function () {
                if (this._instance == null) {
                    this._instance = new AtlasResourceManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**加载图集 */
        AtlasResourceManager.prototype.loadAtlas = function (flagName, kindID, onComplete) {
            if (onComplete === void 0) { onComplete = null; }
            var url = "res/atlas/" + flagName + "_" + kindID + ".atlas";
            //TODO 更改为正则表达式			
            var atlasNameAry = url.split(".")[0].split("/");
            var atlasName = atlasNameAry[atlasNameAry.length - 1];
            if (this._curLoadAtlasDic.indexOf(atlasName) == -1) {
                Laya.loader.load(url, laya.utils.Handler.create(this, this.onLoadComplete, [onComplete, atlasName]), null, Laya.Loader.ATLAS);
            }
            else {
                if (onComplete != null) {
                    onComplete.run();
                }
            }
        };
        AtlasResourceManager.prototype.tryGetTexture = function (flagName, kindID, typeID, statusID) {
            if (statusID === void 0) { statusID = 0; }
            var tex = null;
            if (this._curLoadAtlasDic.indexOf(flagName + "_" + kindID) == -1) {
                return null;
            }
            var urlAry = Laya.Loader.getAtlas("res/atlas/" + flagName + "_" + kindID + ".atlas");
            if (urlAry.length <= 0) {
                console.assert(false, "图集url输入错误");
                return null;
            }
            var texUrl = flagName + "_" + kindID + "_" + typeID + "_" + statusID;
            for (var i = 0; i < urlAry.length; i++) {
                var url = urlAry[i];
                if (url.indexOf(texUrl) != -1) {
                    tex = Laya.Loader.getRes(url);
                    break;
                }
            }
            return tex;
        };
        AtlasResourceManager.prototype.onLoadComplete = function (callBack, atlasName) {
            if (this._curLoadAtlasDic != null) {
                this._curLoadAtlasDic.set(atlasName, atlasName);
            }
            if (callBack != null) {
                callBack.run();
            }
        };
        AtlasResourceManager._instance = null;
        return AtlasResourceManager;
    }());
    manager.AtlasResourceManager = AtlasResourceManager;
})(manager || (manager = {}));
//# sourceMappingURL=AtlasResourceManager.js.map