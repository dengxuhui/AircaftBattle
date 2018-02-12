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
        // Laya.Stat.show();
        Laya.loader.load([
            { url: "res/atlas/public.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS },
            { url: "res/config/master.json", type: Laya.Loader.JSON }
        ], laya.utils.Handler.create(null, this.onLoadComplete));
    }
    Main.prototype.onLoadComplete = function () {
        // if(laya.utils.Browser.onPC == false && laya.utils.Browser.onMobile == false){
        //     console.assert(false,"不支持当前平台");
        //     return;
        // }              
        // gameData.Master.instance().initData(Laya.loader.getRes("res/config/master.json"));      
        // gameData.Master.instance().updateDataByType(100,gameData.Master.MONEY);
        // UICenter.instance().openUI(UI.Main);     
        var url = "res/config/master.json";
        var atlasName = url.match("(?i)(?<=r)[^r]*(?=s)");
        console.log(atlasName);
    };
    return Main;
}());
new Main();
//# sourceMappingURL=Main.js.map