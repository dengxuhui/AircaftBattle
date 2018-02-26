/**
* name 
*/
module operation{
	export class EnemyPanelOperation extends BaseOperation{
		private _enemy:gameobject.GameObject = null;

		constructor(){
			super();
		}

		public register(source:gameobject.GameObject):void{
			this._enemy = source;
		}

		public unregister():void{
			
		}
	}
}