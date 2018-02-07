/*
* 游戏入口
*/
var Main = /** @class */ (function () {
    function Main() {
        Laya.init(480, 800);
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
        Laya.stage.bgColor = "#ffffff";
        Laya.stage.scaleMode = "vertical";
        Laya.stage.alignH = "center";
        //fps调试器
        Laya.Stat.show();
    }
    return Main;
}());
new Main();
//# sourceMappingURL=Main.js.map