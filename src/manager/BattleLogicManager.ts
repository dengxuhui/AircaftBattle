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
			var panelData = {isSelf:true,attrID:0,typeID:0}
			var panel:gameobject.GameObject = gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.PANEL,panelData);
			panel.pos((Laya.stage.width - 88) / 2 ,Laya.stage.height - 100);	
			
			manager.LayerManager.instance().addToLayer(panel,LAYER.BATTLE);							
		}

		public uninitBattleLogic():void{
			
		}
	}
}