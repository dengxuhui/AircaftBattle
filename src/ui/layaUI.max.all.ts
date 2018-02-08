
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class MainUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":480,"height":800},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"main/img_main_bg.jpg"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MainUI.uiView);

        }

    }
}
