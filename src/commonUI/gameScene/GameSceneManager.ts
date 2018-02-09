/**
* name 
*/
module commonUI{
	export class GameSceneManager extends BaseUIManager{
		constructor(){
			super();

			this.addControl(commonUI.GameSceneControl);
			this.addView(commonUI.GameSceneView);
			this.addData(commonUI.GameSceneUIData);
			
			this.addResData(new ResData("res/atlas/gameScene.atlas",Laya.Loader.ATLAS));
		}
	}
}