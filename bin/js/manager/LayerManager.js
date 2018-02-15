/**
* name
*/
var manager;
(function (manager) {
    var Sprite = laya.display.Sprite;
    var LayerManager = /** @class */ (function () {
        function LayerManager() {
            this._layerMap = null;
            this._layerMap = new Map();
            this._layerMap.addValue(LAYER.MAIN, new Sprite());
            this._layerMap.addValue(LAYER.BATTLE, new Sprite());
            this._layerMap.addValue(LAYER.ACTIVITY, new Sprite());
            this._layerMap.addValue(LAYER.POP, new Sprite());
            this.initLayer();
        }
        LayerManager.prototype.initLayer = function () {
            if (this._layerMap == null) {
                console.assert(false, "map == null");
                return;
            }
            for (var i = 0; i < this._layerMap.length; i++) {
                var sp = this._layerMap.getValueByIndex(i);
                sp.mouseEnabled = true;
                sp.mouseThrough = true;
                Laya.stage.addChild(sp);
            }
        };
        LayerManager.instance = function () {
            if (this._instance == null) {
                this._instance = new LayerManager();
            }
            return this._instance;
        };
        LayerManager.prototype.addToLayer = function (source, layerType) {
            if (this._layerMap == null) {
                return;
            }
            var layer = this._layerMap.getValueByKey(layerType);
            if (layer != null) {
                layer.addChild(source);
            }
        };
        LayerManager.prototype.removeFromLayer = function (source, layerType) {
            if (this._layerMap == null) {
                return;
            }
            var layer = this._layerMap.getValueByKey(layerType);
            if (layer != null) {
                layer.removeChild(source);
            }
        };
        LayerManager._instance = null;
        return LayerManager;
    }());
    manager.LayerManager = LayerManager;
})(manager || (manager = {}));
//# sourceMappingURL=LayerManager.js.map