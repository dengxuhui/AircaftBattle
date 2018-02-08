/**
* name 
*/
module commonUI{		
	export class MainManager extends BaseUIManager{
		constructor(){
			super();

			this.addView(commonUI.MainView);
			this.addControl(commonUI.MainControl);

			this.addResData(new ResData("res/atlas/main.atlas",Laya.Loader.ATLAS));
		}
	}
}