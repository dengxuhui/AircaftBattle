/**
* name 
*/
module manager{
	export class BattleLogicManager extends laya.events.EventDispatcher{

		private static _instance:BattleLogicManager = null;
		/**己方战机 */
		private _selfPanel:gameobject.AircarftPanel = null;		
		/**敌机 */
		private _enemyPanels:Map = new Map();
		/**战机随机实例位置 */
		private _enemyPosAry:Array<number> = [0,0,0,0,0];

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
			// //初始化己方		
			this._selfPanel = gameobject.GameObjectFactory.instance().createObject(GAMEOBJ_TYPE.PANEL,0,0,true);
			this._selfPanel.pos((Laya.stage.width - 88) / 2 ,Laya.stage.height - 100);	
			
			manager.LayerManager.instance().addToLayer(this._selfPanel,LAYER.BATTLE);							

			// //计时器初始化敌军
			Laya.timer.loop(100,this,this.createEnemyPanel);
		}

		/**随机创建1-3个敌军，并随机分布在屏幕0-屏幕宽度 位置 */
		private createEnemyPanel():void{		
			var randomNum:number = Math.random();
			var panelNum:number;
			if(randomNum < 0.4){
				panelNum = 1;
			}
			else if(randomNum < 0.8){
				panelNum = 2;
			}
			else{
				panelNum = 3;
			}

			for(var i:number = 0;i < panelNum;i++){
				//随机产生0-5的随机数  这里是在确定资源的个数下产生的随机数
				var randomTypeID:number = Math.ceil(Math.random() * 5);				
				var panel:gameobject.AircarftPanel = gameobject.GameObjectFactory.
				instance().createObject(GAMEOBJ_TYPE.PANEL,randomTypeID + 100,0,false);

				var addPosRandom:number = randomTypeID - 1 < 0 ? 0 : randomTypeID - 1;
				var row:number = this._enemyPosAry[addPosRandom];
				panel.pos(Laya.stage.width / 5 * addPosRandom,-panel.height - row * panel.height);
				this._enemyPosAry[addPosRandom] = row + 1;
				manager.LayerManager.instance().addToLayer(panel,LAYER.BATTLE);
				// panel.getBounds().intersection()
			}

			this.resetEnemyPosAry();
		}
		
		private resetEnemyPosAry():void{
			if(this._enemyPosAry != null){
				for(var i:number = 0;i < this._enemyPosAry.length;i++){
					if(this._enemyPanels[i] == 0){
						continue;
					}
					this._enemyPanels[i] = 0;
				}
			}
		}

		public uninitBattleLogic():void{
			Laya.timer.clear(this,this.createEnemyPanel);
		}
	}
}