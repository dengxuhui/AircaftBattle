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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameSceneUI = /** @class */ (function (_super) {
        __extends(GameSceneUI, _super);
        function GameSceneUI() {
            return _super.call(this) || this;
        }
        GameSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameSceneUI.uiView);
        };
        GameSceneUI.uiView = { "type": "View", "props": { "width": 480, "height": 800 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "imgBg", "skin": "gameScene/img_systemimg.png" } }, { "type": "ProgressBar", "props": { "y": 10, "x": 56, "width": 355, "var": "progressCurEnemyHp", "skin": "comp/progress.png", "height": 14 } }] };
        return GameSceneUI;
    }(View));
    ui.GameSceneUI = GameSceneUI;
})(ui || (ui = {}));
(function (ui) {
    var MainUI = /** @class */ (function (_super) {
        __extends(MainUI, _super);
        function MainUI() {
            return _super.call(this) || this;
        }
        MainUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.MainUI.uiView);
        };
        MainUI.uiView = { "type": "View", "props": { "width": 480, "height": 800 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "public/img_main_bg.jpg" } }, { "type": "Animation", "props": { "y": 338, "x": 216, "var": "aniShowAircarft", "source": "ShowAircrftFly.ani" } }, { "type": "Image", "props": { "y": 0, "x": 15, "skin": "main/img_main_logo.png" } }, { "type": "Button", "props": { "y": 522, "x": 143, "var": "btnStart", "stateNum": 1, "skin": "main/btn_main_Btn_pressed8.png" } }] };
        return MainUI;
    }(View));
    ui.MainUI = MainUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map