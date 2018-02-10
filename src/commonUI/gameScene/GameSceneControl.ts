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
			this.loadGameRes();
		}
		
		private loadGameRes():void{
			
		}

		private addBullet():void{
			var url = Laya.Loader.getAtlas("res/atlas/comp.atlas");
			console.log(url);
			var bulletData:object = {};
			
			// var bullet:gameobject.Bullet = gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.BULLET);
		}

		public onHide():void{

		}
	}
}