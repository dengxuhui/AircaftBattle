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
var commonUI;
(function (commonUI) {
    var GameSceneControl = /** @class */ (function (_super) {
        __extends(GameSceneControl, _super);
        function GameSceneControl() {
            var _this = _super.call(this) || this;
            _this._rollBgAry = null;
            return _this;
        }
        GameSceneControl.prototype.onShow = function () {
            var uiData = this._dataCenter.getData(commonUI.GameSceneUIData);
            var view = this._viewCenter.getView(commonUI.GameSceneView);
            if (uiData != null && view != null) {
                view.progressCurEnemyHp.visible = uiData.curEnemy != null;
            }
            this._rollBgAry = new Array();
            this._rollBgAry.push(view.imgBg);
            var scBg = new Laya.Image(view.imgBg.skin);
            scBg.y = -Laya.stage.height;
            view.addChild(scBg);
            this._rollBgAry.push(scBg);
            this.startRollBg();
            //改逻辑应由一个状态栈所控制，这里为了简化 直接通过UI控制战斗逻辑入口开始及初始化
            manager.BattleLogicManager.instance().inintBattleLoagic();
        };
        GameSceneControl.prototype.onHide = function () {
            manager.BattleLogicManager.instance().uninitBattleLogic();
        };
        GameSceneControl.prototype.startRollBg = function () {
            Laya.timer.frameLoop(1, this, this.moveBg);
        };
        GameSceneControl.prototype.moveBg = function () {
            for (var i = 0; i < this._rollBgAry.length; i++) {
                var img = this._rollBgAry[i];
                img.y += GameSceneControl.MOVE_SPEED;
            }
            var firstImg = this._rollBgAry[0];
            if (firstImg.y >= Laya.stage.height) {
                firstImg.y = this._rollBgAry[1].y - this._rollBgAry[1].height;
                this._rollBgAry.push(this._rollBgAry.shift());
            }
        };
        GameSceneControl.MOVE_SPEED = 2;
        return GameSceneControl;
    }(BaseUIControl));
    commonUI.GameSceneControl = GameSceneControl;
})(commonUI || (commonUI = {}));
//# sourceMappingURL=GameSceneControl.js.map