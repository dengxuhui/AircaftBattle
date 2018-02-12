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
var manager;
(function (manager) {
    var BattleLogicManager = /** @class */ (function (_super) {
        __extends(BattleLogicManager, _super);
        function BattleLogicManager() {
            return _super.call(this) || this;
        }
        BattleLogicManager.instance = function () {
            if (this._instance == null) {
                this._instance = new BattleLogicManager();
            }
            return this._instance;
        };
        BattleLogicManager.prototype.inintBattleLoagic = function () {
            var panelData = { isSelf: true, attrID: 0, typeID: 0 };
            var panel = gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.PANEL, panelData);
            panel.x = panel.getBounds().width / 2;
            panel.y = panel.getBounds().height / 2;
            manager.LayerManager.instance().addToLayer(panel, LAYER.BATTLE);
        };
        BattleLogicManager.prototype.uninitBattleLogic = function () {
        };
        BattleLogicManager._instance = null;
        return BattleLogicManager;
    }(laya.events.EventDispatcher));
    manager.BattleLogicManager = BattleLogicManager;
})(manager || (manager = {}));
//# sourceMappingURL=BattleLogicManager.js.map