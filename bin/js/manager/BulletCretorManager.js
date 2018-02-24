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
            this._curBullet = new Array();
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
            Laya.timer.loop(100, this, this.create);
            Laya.timer.frameLoop(1, this, this.update);
        };
        BulletCreatorManager.prototype.create = function () {
            var bullet = gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.BULLET, this._data);
            bullet.pos(this._host.x, this._host.y);
            manager.LayerManager.instance().addToLayer(bullet, LAYER.BATTLE);
            this._curBullet.push(bullet);
        };
        BulletCreatorManager.prototype.update = function () {
            for (var i = 0; i < this._curBullet.length; i++) {
                var bullet = this._curBullet[i];
                if (bullet != null) {
                    if (this._isSelf) {
                        if (bullet.y < 0) {
                            if (bullet.parent != null) {
                                bullet.parent.removeChild(bullet);
                            }
                            gameobject.GameObjectFactory.instance().disposeObj(bullet, GAMEOJB_TYPE.BULLET);
                            // this._curBullet.splice(i,1);
                            // i--;
                            bullet = null;
                        }
                        else {
                            bullet.y -= 5;
                        }
                    }
                    else {
                        if (bullet.y > Laya.stage.height) {
                            if (bullet.parent != null) {
                                bullet.parent.removeChild(bullet);
                            }
                            gameobject.GameObjectFactory.instance().disposeObj(bullet, GAMEOJB_TYPE.BULLET);
                            this._curBullet.splice(i, 1);
                            i--;
                        }
                        else {
                            bullet.y += 5;
                        }
                    }
                }
            }
        };
        BulletCreatorManager.prototype.dispose = function () {
            Laya.timer.clearAll(this);
        };
        return BulletCreatorManager;
    }());
    manager.BulletCreatorManager = BulletCreatorManager;
})(manager || (manager = {}));
//# sourceMappingURL=BulletCretorManager.js.map