/**
* name 
*/
module commonUI{
	export class GameSceneControl extends BaseUIControl{
		constructor(){
			super();
		}

		public onShow():void{
			var uiData:commonUI.GameSceneUIData = this._dataCenter.getData(commonUI.GameSceneUIData);
			var view:commonUI.GameSceneView = this._viewCenter.getView(commonUI.GameSceneView);
			if(uiData != null && view != null){
				view.progressCurEnemyHp.visible = uiData.curEnemy != null;
			}
		}
		
		public onHide():void{

		}
	}
}