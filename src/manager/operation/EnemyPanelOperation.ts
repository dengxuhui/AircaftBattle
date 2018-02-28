/**
* name 
*/
module operation{
	export class EnemyPanelOperation extends BaseOperation{
		private static ENEMY_FLY_SPEED:number = 5;
		private _enemy:gameobject.GameObject = null;

		constructor(){
			super();
		}

		public register(source:gameobject.GameObject):void{
			this._enemy = source;
			if(this._enemy != null){
				Laya.timer.frameLoop(1,this,this.update);
			}
		}

		private update():void{
			if(this._enemy.y > Laya.stage.height){
				if(this._enemy.parent != null){
					this._enemy.parent.removeChild(this._enemy);
				}
				Laya.timer.clear(this,this.update);
				gameobject.GameObjectFactory.instance().disposeObj(this._source);
			}
			else{
				this._enemy.y += EnemyPanelOperation.ENEMY_FLY_SPEED;
			}
		}

		public unregister():void{
			Laya.timer.clear(this,this.update);
		}
	}
}