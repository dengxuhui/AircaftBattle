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
        AtlasResourceManager.prototype.loadAtlas = function (url, onComplete) {
            if (onComplete === void 0) { onComplete = null; }
            var atlasName = url.match("/:([^/]+?)./")[0];
            Laya.loader.load(url, laya.utils.Handler.create(this, this.onLoadComplete, [onComplete]), null, Laya.Loader.ATLAS);
        };
        AtlasResourceManager.prototype.onLoadComplete = function (callBack) {
            if (callBack != null) {
                callBack.caller();
            }
        };
        AtlasResourceManager._instance = null;
        return AtlasResourceManager;
    }());
    manager.AtlasResourceManager = AtlasResourceManager;
})(manager || (manager = {}));
//# sourceMappingURL=AtlasResourceManager.js.map