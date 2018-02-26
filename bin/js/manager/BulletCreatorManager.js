/**
* name
*/
var manager;
(function (manager) {
    /**所有飞机不管自己还是敌人的子弹创建速度都保持一致 */
    var BulletCreatorManager = /** @class */ (function () {
        function BulletCreatorManager(host) {
            this._host = null;
            this._data = null;
            if (host == null) {
                console.assert(false, "宿主对象为空");
                return;
            }
            this._host = host;
            this._bulletAttr = host.attrID;
            this._bulletType = host.typeID;
            this._isSelf = host.isSelf;
            this._data = { attrID: this._bulletAttr, typeID: this._bulletType, isSelf: this._isSelf };
            manager.AtlasResourceManager.Instance.loadAtlas(manager.AtlasResourceManager.BULLET, laya.utils.Handler.create(this, this.startCreate));
        }
        BulletCreatorManager.prototype.startCreate = function () {
            Laya.timer.loop(250, this, this.create);
        };
        BulletCreatorManager.prototype.create = function () {
            var bullet = gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.BULLET, this._data);
            bullet.pos(this._host.x + this._host.width / 2, this._host.y - bullet.height / 2);
            manager.LayerManager.instance().addToLayer(bullet, LAYER.BATTLE);
        };
        BulletCreatorManager.prototype.dispose = function () {
            Laya.timer.clearAll(this);
        };
        return BulletCreatorManager;
    }());
    manager.BulletCreatorManager = BulletCreatorManager;
})(manager || (manager = {}));
//# sourceMappingURL=BulletCreatorManager.js.map