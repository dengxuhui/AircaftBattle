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
            return _super.call(this) || this;
        }
        GameSceneControl.prototype.onShow = function () {
            var uiData = this._dataCenter.getData(commonUI.GameSceneUIData);
            var view = this._viewCenter.getView(commonUI.GameSceneView);
            if (uiData != null && view != null) {
                view.progressCurEnemyHp.visible = uiData.curEnemy != null;
            }
        };
        GameSceneControl.prototype.onHide = function () {
        };
        return GameSceneControl;
    }(BaseUIControl));
    commonUI.GameSceneControl = GameSceneControl;
})(commonUI || (commonUI = {}));
//# sourceMappingURL=GameSceneControl.js.map