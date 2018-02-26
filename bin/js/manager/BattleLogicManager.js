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
            var _this = _super.call(this) || this;
            /**己方战机 */
            _this._selfPanel = null;
            /**敌机 */
            _this._enemyPanels = new Map();
            /**战机随机实例位置 */
            _this._enemyPosAry = [0, 0, 0, 0, 0];
            return _this;
        }
        BattleLogicManager.instance = function () {
            if (this._instance == null) {
                this._instance = new BattleLogicManager();
            }
            return this._instance;
        };
        BattleLogicManager.prototype.inintBattleLoagic = function () {
            //初始化己方
            var panelData = { isSelf: true, attrID: 0, typeID: 0 };
            this._selfPanel = gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.PANEL, panelData);
            this._selfPanel.pos((Laya.stage.width - 88) / 2, Laya.stage.height - 100);
            manager.LayerManager.instance().addToLayer(this._selfPanel, LAYER.BATTLE);
            //计时器初始化敌军
            Laya.timer.loop(100, this, this.createEnemyPanel);
        };
        /**随机创建1-3个敌军，并随机分布在屏幕0-屏幕宽度 位置 */
        BattleLogicManager.prototype.createEnemyPanel = function () {
            var randomNum = Math.random();
            var panelNum;
            if (randomNum < 0.4) {
                panelNum = 1;
            }
            else if (randomNum < 0.8) {
                panelNum = 2;
            }
            else {
                panelNum = 3;
            }
            for (var i = 0; i < panelNum; i++) {
                //随机产生0-5的随机数  这里是在确定资源的个数下产生的随机数
                var randomTypeID = Math.ceil(Math.random() * 5);
                var panelData = { isSelf: false, attrID: 1, typeID: randomTypeID };
                var panel = gameobject.GameObjectFactory.
                    instance().createObject(GAMEOJB_TYPE.PANEL, panelData);
                var addPosRandom = randomTypeID - 1 < 0 ? 0 : randomTypeID - 1;
                var row = this._enemyPosAry[addPosRandom];
                panel.pos(Laya.stage.width / 5 * addPosRandom, -panel.height - row * panel.height);
                this._enemyPosAry[addPosRandom] = row + 1;
                manager.LayerManager.instance().addToLayer(panel, LAYER.BATTLE);
            }
            this.resetEnemyPosAry();
        };
        BattleLogicManager.prototype.resetEnemyPosAry = function () {
            if (this._enemyPosAry != null) {
                for (var i = 0; i < this._enemyPosAry.length; i++) {
                    if (this._enemyPanels[i] == 0) {
                        continue;
                    }
                    this._enemyPanels[i] = 0;
                }
            }
        };
        BattleLogicManager.prototype.uninitBattleLogic = function () {
            Laya.timer.clear(this, this.createEnemyPanel);
        };
        BattleLogicManager._instance = null;
        return BattleLogicManager;
    }(laya.events.EventDispatcher));
    manager.BattleLogicManager = BattleLogicManager;
})(manager || (manager = {}));
//# sourceMappingURL=BattleLogicManager.js.map