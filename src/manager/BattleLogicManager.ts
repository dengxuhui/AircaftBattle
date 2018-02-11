/**
* name 
*/
module manager{
	export class BattleLogicManager extends laya.events.EventDispatcher{

		private static _instance:BattleLogicManager = null;
		constructor(){
			super();
		}

		public static instance():BattleLogicManager{
			if(this._instance == null){
				this._instance = new BattleLogicManager();
			}
			return this._instance;
		}

		public inintBattleLoagic():void{
			var panel:gameobject.GameObject = gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.PANEL);
			panel.x = (Laya.stage.width - panel.width)/2;			
			panel.y = (Laya.stage.height - panel.height);
			manager.LayerManager.instance().addToLayer(panel,LAYER.ACTIVITY);
		}

		public uninitBattleLogic():void{
			
		}
	}
}