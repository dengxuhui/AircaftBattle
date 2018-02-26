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
            _this._operationID = -1;
            _this._bulletMgr = null;
            _this._render = new Sprite();
            _this.addChild(_this._render);
            return _this;
        }
        Object.defineProperty(AircarftPanel.prototype, "typeID", {
            get: function () {
                return this._typeID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AircarftPanel.prototype, "attrID", {
            get: function () {
                return this._attrID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AircarftPanel.prototype, "isSelf", {
            get: function () {
                return this._isSelf;
            },
            enumerable: true,
            configurable: true
        });
        AircarftPanel.prototype.setData = function (data) {
            this._isSelf = data["isSelf"];
            this._attrID = data["attrID"];
            this._typeID = data["typeID"];
            var tex = manager.AtlasResourceManager.Instance.tryGetTexture(manager.AtlasResourceManager.AIRCRAFT_PANEL, AircarftPanel.ATTR_NAME, this._attrID, this._typeID);
            if (tex == null) {
                manager.AtlasResourceManager.Instance.loadAtlas(manager.AtlasResourceManager.AIRCRAFT_PANEL, laya.utils.Handler.create(this, this.onLoadAtlasComplete));
            }
            else {
                this.setRenderTexture(tex);
            }
            if (this._isSelf) {
                this._operationID = manager.OperationManager.Instance.registerOperation(this, OPERATION_TYPE.MASTER_PANEL);
            }
            else {
                this._operationID = manager.OperationManager.Instance.registerOperation(this, OPERATION_TYPE.ENEMY_PANEL);
            }
        };
        AircarftPanel.prototype.onLoadAtlasComplete = function () {
            var tex = manager.AtlasResourceManager.Instance.tryGetTexture(manager.AtlasResourceManager.AIRCRAFT_PANEL, AircarftPanel.ATTR_NAME, this._attrID, this._typeID);
            this.setRenderTexture(tex);
        };
        AircarftPanel.prototype.setRenderTexture = function (texture) {
            if (texture == null) {
                return;
            }
            this._render.graphics.drawTexture(texture);
            this.size(texture.width, texture.height);
            this._bulletMgr = new manager.BulletCreatorManager(this);
        };
        AircarftPanel.prototype.dispose = function () {
            manager.OperationManager.Instance.unregisterOperation(this._operationID);
            if (this._bulletMgr != null) {
                this._bulletMgr.dispose();
            }
        };
        AircarftPanel.ATTR_NAME = "panel";
        return AircarftPanel;
    }(gameobject.GameObject));
    gameobject.AircarftPanel = AircarftPanel;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=AircarftPanel.js.map