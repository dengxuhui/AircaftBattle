/**
* name 
*/
module gameobject{
	export class GameObjectFactory extends laya.events.EventDispatcher{

		private static _instance:GameObjectFactory = null;
		private _gameObjDic:Dictionary = null;
		private _objectPoolMap:Map = null;

		constructor(){
			super();
			this._objectPoolMap = new Map();
			this._gameObjDic = new Dictionary();			
			this._gameObjDic.set(GAMEOJB_TYPE.BULLET,gameobject.Bullet);
		}

		public static instance():GameObjectFactory{
			if(this._instance == null){
				this._instance = new GameObjectFactory();
			}
			return this._instance;
		}		

		public createObject(objType:number,data:any = null):any
		{
			var gameObj:gameobject.GameObject = null;
			gameObj = this.findObjInPool(objType);
			if(gameObj == null){
				var className:any = this._gameObjDic.get(objType);
				gameObj = new className();
				gameObj.setData(data);
				gameObj.gameObjType = objType;
			}
			else{
				// gameObj.ca
				gameObj.setData(data);				
			}

			return gameObj;
		}
		
		private findObjInPool(objType:number):gameobject.GameObject
		{
			var gameObj:gameobject.GameObject = null;
			var gameObjAry:Array<gameobject.GameObject> = this._objectPoolMap.getValueByKey(objType);
			if(gameObjAry == null || gameObjAry.length <= 0){
				return null;
			}
			gameObj = gameObjAry.shift();
			return gameObj;
		}

		public dispose():void{
			this._gameObjDic = null;
		}
	}
}