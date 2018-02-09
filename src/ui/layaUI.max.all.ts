
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameSceneUI extends View {
		public progressCurEnemyHp:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":480,"height":800},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"gameScene/img_systemimg.png"}},{"type":"ProgressBar","props":{"y":10,"x":56,"width":355,"var":"progressCurEnemyHp","skin":"comp/progress.png","height":14}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameSceneUI.uiView);

        }

    }
}

module ui {
    export class MainUI extends View {
		public aniShowAircarft:Laya.Animation;
		public btnStart:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":480,"height":800},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"public/img_main_bg.jpg"}},{"type":"Animation","props":{"y":338,"x":216,"var":"aniShowAircarft","source":"ShowAircrftFly.ani"}},{"type":"Image","props":{"y":0,"x":15,"skin":"main/img_main_logo.png"}},{"type":"Button","props":{"y":522,"x":143,"var":"btnStart","stateNum":1,"skin":"main/btn_main_Btn_pressed8.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MainUI.uiView);

        }

    }
}
