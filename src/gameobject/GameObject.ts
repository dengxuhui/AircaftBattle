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
		protected _gameObjType:number = -1;
		/**引用计数 */
		protected _refCount:number = 0;

		constructor(){
			super();
		}

		public setData(data:any):void{
			this._data = data;
		}

		public initialize():void{
			this.on(gameobject.GameObjectEvent.REQUEST_DISPOSE,this,this.onObjRequestDispose);
			this.on(gameobject.GameObjectEvent.CANCEL_DISPOSE,this,this.onOjbCancelDispose);
		}

		public uninitialize():void{
			this.off(gameobject.GameObjectEvent.REQUEST_DISPOSE,this,this.onObjRequestDispose);
			this.off(gameobject.GameObjectEvent.CANCEL_DISPOSE,this,this.onOjbCancelDispose);
		}

		public onObjRequestDispose():void{

		}

		public onOjbCancelDispose():void{

		}

		public cancelDispose():void{
			this.event(gameobject.GameObjectEvent.CANCEL_DISPOSE,{objType:this._gameObjType});
		}

		public dipatchDisposeEvent():void{
			this.event(gameobject.GameObjectEvent.DISPOSE,{ojbType:this._gameObjType});
		}

		public dispose():void{
			
		}

		public set isWaitForDispose(value:boolean){
			this._isWaitForDispose = value;
		}

		public get isWaitForDispose():boolean{
			return this._isWaitForDispose;
		}

		public get gameObjType():number{
			return this._gameObjType;
		}

		public set gameObjType(value:number){
			this._gameObjType = value;
		}

		public get refCount():number{
			return this._refCount;
		}

		public set refCount(value:number){
			this._refCount = value;
		}
	}
}