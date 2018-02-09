/**
* name 
*/
module gameobject{
	import Sprite = Laya.Sprite;
	export class GameObject extends Sprite{
		/**是否是自己 如果不是自己飞行方向会反向 */
		protected _isSelf:boolean = false;				
		protected _canCache:boolean = false;
		protected _isWaitForDispose:boolean = false;
		protected _data:object = null;
		protected _layerType:number = LAYER.MAIN;

		constructor(){
			super();
		}

		public setData(data:any):void{
			this._data = data;
		}

		public initialize():void{
			// addEventListener()
		}

		public uninitialize():void{

		}

		public cancelDispose():void{
			this.event(gameobject.GameObjectEvent.CANCEL_DISPOSE)
		}

		public dispose():void{
			if(this.parent != null){
				this.parent.removeChild(this);
			}
			if(!this._isWaitForDispose){
				return;
			}
		}
	}
}