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

			//改逻辑应由一个状态栈所控制，这里为了简化 直接通过UI控制战斗逻辑入口开始及初始化
			manager.BattleLogicManager.instance().inintBattleLoagic();
		}

		public onHide():void{
			manager.BattleLogicManager.instance().uninitBattleLogic();
		}
	}
}