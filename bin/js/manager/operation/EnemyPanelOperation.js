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
var operation;
(function (operation) {
    var EnemyPanelOperation = /** @class */ (function (_super) {
        __extends(EnemyPanelOperation, _super);
        function EnemyPanelOperation() {
            var _this = _super.call(this) || this;
            _this._enemy = null;
            return _this;
        }
        EnemyPanelOperation.prototype.register = function (source) {
            this._enemy = source;
            if (this._enemy != null) {
                Laya.timer.frameLoop(1, this, this.update);
            }
        };
        EnemyPanelOperation.prototype.update = function () {
            if (this._enemy.y > Laya.stage.height) {
                if (this._enemy.parent != null) {
                    this._enemy.parent.removeChild(this._enemy);
                }
                Laya.timer.clear(this, this.update);
                gameobject.GameObjectFactory.instance().disposeObj(this._enemy);
            }
            else {
                this._enemy.y += EnemyPanelOperation.ENEMY_FLY_SPEED;
            }
        };
        EnemyPanelOperation.prototype.unregister = function () {
            Laya.timer.clear(this, this.update);
        };
        EnemyPanelOperation.ENEMY_FLY_SPEED = 5;
        return EnemyPanelOperation;
    }(operation.BaseOperation));
    operation.EnemyPanelOperation = EnemyPanelOperation;
})(operation || (operation = {}));
//# sourceMappingURL=EnemyPanelOperation.js.map