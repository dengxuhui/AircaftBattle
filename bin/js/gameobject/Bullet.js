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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        function Bullet() {
            var _this = _super.call(this) || this;
            /**渲染对象 */
            _this._render = null;
            _this._curTexture = null;
            _this._render = new Sprite();
            _this.addChild(_this._render);
            return _this;
        }
        Bullet.prototype.initialize = function () {
            var tex = manager.AtlasResourceManager.Instance.tryGetTexture(gameobject.GameObject.ATLAS_FLAG, this._kindID, this._typeID, this._statusID);
            if (tex == null) {
                manager.AtlasResourceManager.Instance.loadAtlas(gameobject.GameObject.ATLAS_FLAG, this._kindID, laya.utils.Handler.create(this, this.onLoadAtlasComplete));
            }
            else {
                this.setRenderTexture(tex);
            }
        };
        Bullet.prototype.onLoadAtlasComplete = function () {
            var tex = manager.AtlasResourceManager.Instance.tryGetTexture(gameobject.GameObject.ATLAS_FLAG, this._kindID, this._typeID, this._statusID);
            this.setRenderTexture(tex);
        };
        Bullet.prototype.setRenderTexture = function (texture) {
            if (texture == null) {
                return;
            }
            //避免高频DC
            if (this._curTexture == null || (this._curTexture != null && this._curTexture.url != texture.url)) {
                this._render.graphics.drawTexture(texture);
                this.size(texture.width, texture.height);
                this._curTexture = texture;
            }
            Laya.timer.frameLoop(1, this, this.update);
        };
        Bullet.prototype.update = function () {
            if (this._isSelf) {
                if (this.y < 0) {
                    this.destorySelf();
                }
                else {
                    this.y -= Bullet.MOVE_SPEED;
                    this.checkHit();
                }
            }
            else {
                if (this.y > Laya.stage.height) {
                    this.destorySelf();
                }
                else {
                    this.y += Bullet.MOVE_SPEED;
                }
            }
        };
        Bullet.prototype.destorySelf = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            Laya.timer.clear(this, this.update);
            gameobject.GameObjectFactory.instance().disposeObj(this);
        };
        Bullet.prototype.checkHit = function () {
            var enemys = manager.BattleLogicManager.instance().allEnemys;
            if (enemys == null || enemys.values.length <= 0) {
                return;
            }
            for (var i = 0; i < enemys.values.length; i++) {
                var enemy = enemys.values[i];
                if (this.getBounds().intersects(enemy.getBounds())) {
                    manager.BattleLogicManager.instance().setEnemyHurt(enemys.keys[i]);
                    this.destorySelf();
                    return;
                }
            }
        };
        Bullet.MOVE_SPEED = 5;
        Bullet.BULLET = "bullet";
        return Bullet;
    }(gameobject.GameObject));
    gameobject.Bullet = Bullet;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=Bullet.js.map