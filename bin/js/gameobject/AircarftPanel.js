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
            _this._kindID = -1;
            _this._typeID = -1;
            _this._statusID = -1;
            _this._uID = -1;
            _this._bulletMgr = null;
            _this._curTexture = null;
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
        Object.defineProperty(AircarftPanel.prototype, "kindID", {
            get: function () {
                return this._kindID;
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
        Object.defineProperty(AircarftPanel.prototype, "statusID", {
            get: function () {
                return this._statusID;
            },
            enumerable: true,
            configurable: true
        });
        AircarftPanel.prototype.setData = function (data) {
            this._isSelf = data["isSelf"];
            this._kindID = data["kindID"];
            this._typeID = data["typeID"];
            this._statusID = data["statusID"] != null ? data["statusID"] : 0;
            var tex = manager.AtlasResourceManager.Instance.tryGetTexture(gameobject.GameObject.ATLAS_FLAG, this._kindID, this._typeID, this._statusID);
            if (tex == null) {
                manager.AtlasResourceManager.Instance.loadAtlas(gameobject.GameObject.ATLAS_FLAG, this._kindID, laya.utils.Handler.create(this, this.onLoadAtlasComplete));
            }
            else {
                this.setRenderTexture(tex);
            }
        };
        AircarftPanel.prototype.onLoadAtlasComplete = function () {
            var tex = manager.AtlasResourceManager.Instance.tryGetTexture(gameobject.GameObject.ATLAS_FLAG, this._kindID, this._typeID, this._statusID);
            this.setRenderTexture(tex);
        };
        AircarftPanel.prototype.setRenderTexture = function (texture) {
            if (texture == null) {
                return;
            }
            //避免高频DC
            if (this._curTexture == null || (this._curTexture != null && this._curTexture.url != texture.url)) {
                this._render.graphics.drawTexture(texture);
                this.size(texture.width, texture.height);
            }
            if (this._isSelf) {
                this._uID = manager.OperationManager.Instance.registerOperation(this, OPERATION_TYPE.MASTER_PANEL);
            }
            else {
                this._uID = manager.OperationManager.Instance.registerOperation(this, OPERATION_TYPE.ENEMY_PANEL);
            }
            this._bulletMgr = new manager.BulletCreatorManager(this);
        };
        Object.defineProperty(AircarftPanel.prototype, "uID", {
            get: function () {
                return this._uID;
            },
            enumerable: true,
            configurable: true
        });
        AircarftPanel.prototype.dispose = function () {
            manager.OperationManager.Instance.unregisterOperation(this._uID);
            if (this._bulletMgr != null) {
                this._bulletMgr.dispose();
            }
        };
        return AircarftPanel;
    }(gameobject.GameObject));
    gameobject.AircarftPanel = AircarftPanel;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=AircarftPanel.js.map