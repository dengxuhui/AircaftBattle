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
    var GameSceneView = /** @class */ (function (_super) {
        __extends(GameSceneView, _super);
        function GameSceneView() {
            return _super.call(this) || this;
        }
        GameSceneView.prototype.clear = function () {
        };
        GameSceneView.prototype.onShow = function () {
            manager.LayerManager.instance().addToLayer(this, LAYER.MAIN);
        };
        GameSceneView.prototype.dispose = function () {
            _super.prototype.destroy.call(this);
        };
        GameSceneView.prototype.onHide = function () {
            manager.LayerManager.instance().removeFromLayer(this, LAYER.MAIN);
        };
        GameSceneView.prototype.onInit = function () {
        };
        return GameSceneView;
    }(ui.GameSceneUI));
    commonUI.GameSceneView = GameSceneView;
})(commonUI || (commonUI = {}));
//# sourceMappingURL=GameSceneView.js.map