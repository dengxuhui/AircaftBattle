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
    var Sprite = laya.display.Sprite;
    var AircarftPanel = /** @class */ (function (_super) {
        __extends(AircarftPanel, _super);
        function AircarftPanel() {
            var _this = _super.call(this) || this;
            _this._render = null;
            _this._curDir = DIRECTION.UP;
            _this._attrID = -1;
            _this._typeID = -1;
            _this._render = new Sprite();
            _this.addChild(_this._render);
            if (laya.utils.Browser.onPC) {
                _this._render.on(Laya.Event.MOUSE_MOVE, _this, _this.onMouseMove);
            }
            _this._render.on(Laya.Event.MOUSE_DOWN, _this, _this.onMouseMove);
            return _this;
        }
        AircarftPanel.prototype.onMouseMove = function (arg) {
            console.log(arg);
            console.log("dd");
        };
        AircarftPanel.prototype.setData = function (data) {
            this._isSelf = data["isSelf"];
            this._attrID = data["attrID"];
            this._typeID = data["typeID"];
            var tex = manager.AtlasResourceManager.Instance.tryGetTexture(manager.AtlasResourceManager.AIRCRAFT_PANEL, AircarftPanel.ATTR_NAME, this._attrID, this._typeID);
            if (tex == null) {
                manager.AtlasResourceManager.Instance.loadAtlas("res/atlas/" +
                    manager.AtlasResourceManager.AIRCRAFT_PANEL + ".atlas", laya.utils.Handler.create(this, this.onLoadAtlasComplete));
            }
            else {
                this.setRenderTexture(tex);
            }
        };
        AircarftPanel.prototype.onLoadAtlasComplete = function () {
            var tex = manager.AtlasResourceManager.Instance.tryGetTexture(manager.AtlasResourceManager.AIRCRAFT_PANEL, AircarftPanel.ATTR_NAME, this._attrID, this._typeID);
            this.setRenderTexture(tex);
        };
        AircarftPanel.prototype.setRenderTexture = function (texture) {
            if (texture == null || this._render == null) {
                return;
            }
            this._render.graphics.drawTexture(texture);
        };
        /**改变方向 */
        AircarftPanel.prototype.changeDir = function (dir) {
            this.changeSkin(dir);
            //最后赋值
            this._curDir = dir;
        };
        /**更改皮肤 */
        AircarftPanel.prototype.changeSkin = function (dir) {
            if (this._curDir == dir) {
                return;
            }
            switch (dir) {
                case DIRECTION.UP: {
                }
                case DIRECTION.DOWN: {
                }
                case DIRECTION.LEFT: {
                }
                case DIRECTION.RIGHT: {
                }
            }
        };
        Object.defineProperty(AircarftPanel.prototype, "curDir", {
            get: function () {
                return this._curDir;
            },
            enumerable: true,
            configurable: true
        });
        AircarftPanel.ATTR_NAME = "panel";
        return AircarftPanel;
    }(gameobject.GameObject));
    gameobject.AircarftPanel = AircarftPanel;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=AircarftPanel.js.map