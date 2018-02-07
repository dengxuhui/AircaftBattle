/*
* 游戏入口
*/
class Main{

    constructor(){
        Laya.init(480,800);

        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
        Laya.stage.bgColor = "#ffffff";
        Laya.stage.scaleMode = "vertical";
        Laya.stage.alignH = "center";

        //fps调试器
        Laya.Stat.show();
    }
}

new Main();