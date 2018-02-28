/**
* name 
*/
module gameobject{
	import Sprite = Laya.Sprite;
	export class GameObject extends Sprite{
		public static ATLAS_FLAG:string = "gameobject";

		/**是否是自己 如果不是自己飞行方向会反向 */
		protected _isSelf:boolean = false;				
		protected _canCache:boolean = false;
		protected _kindID:number = -1;
		protected _typeID:number = -1;
		protected _statusID:number = -1;		
		protected _layerType:number = LAYER.MAIN;		
		protected _varsData:object = null;

		/**引用计数 */
		private _refCount:number = 0;
		private _isWaitForDispose:boolean = false;

		constructor(){
			super();
			this.pivot(0,0);
		}

		public setData(kindID:number,typeID:number,statusID:number = 0,isSelf:boolean,varsData:object = null):void{
			this._kindID = kindID;
			this._typeID = typeID;
			this._statusID = statusID;
			this._isSelf = isSelf;
			this._varsData = varsData;
		}

		public get kindID():number{
			return this._kindID;
		}

		public get typeID():number{
			return this._typeID;
		}

		public get statusID():number{
			return this._statusID;
		}

		public get varsData():object{
			return this._varsData;
		}

		public initialize():void{
		
		}

		public uninitialize():void{
		
		}

		public dispose():void{
			
		}

		public set isWaitForDispose(value:boolean){
			this._isWaitForDispose = value;
		}

		public get isWaitForDispose():boolean{
			return this._isWaitForDispose;
		}

		public get refCount():number{
			return this._refCount;
		}

		public set refCount(value:number){
			this._refCount = value;
		}
	}
}