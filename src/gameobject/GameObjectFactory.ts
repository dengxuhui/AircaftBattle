/**
* name 
*/
module gameobject {
	export class GameObjectFactory extends laya.events.EventDispatcher {

		private static _instance: GameObjectFactory = null;
		private static MAX_CACHE_NUM: number = 1000;
		private _objClassDic: Dictionary = null;
		/**一级缓存用于缓存只被用了一次的资源 */
		private _objectFirstPoolMap: Map = null;
		/**二级缓存用于缓存经常使用的资源，从资源池拿去先从当前资源池拿取 */
		private _objectSecondPoolMap: Map = null;
		private _curCacheObjNum: number = 0;

		constructor() {
			super();
			this._objectFirstPoolMap = new Map();
			this._objectSecondPoolMap = new Map();
			this._objClassDic = new Dictionary();
			this._objClassDic.set(GAMEOBJ_TYPE.BULLET, gameobject.Bullet);
			this._objClassDic.set(GAMEOBJ_TYPE.PANEL,gameobject.AircarftPanel);
		}

		public static instance(): GameObjectFactory {
			if (this._instance == null) {
				this._instance = new GameObjectFactory();
			}
			return this._instance;
		}

		public createObject(objType: number, data: any = null): any {
			var gameObj: gameobject.GameObject = null;
			gameObj = this.findObjInPool(objType);
			if (gameObj == null) {
				var className: any = this._objClassDic.get(objType);
				gameObj = new className();
				gameObj.setData(data);
				gameObj.gameObjType = objType;
			}
			else {
				gameObj.setData(data);
			}
			return gameObj;
		}

		public disposeObj(obj: gameobject.GameObject, objType: number): void {
			if (obj == null || objType < 0) {
				return;
			}
			obj.isWaitForDispose = true;

			if(obj.refCount > 0){//被从资源池重复利用过
				var secondObjAry:Array<gameobject.GameObject> = this._objectSecondPoolMap.getValueByKey(objType);
				if(secondObjAry == null){					
					secondObjAry = new Array<gameobject.GameObject>();
					this._objectSecondPoolMap.addValue(objType,secondObjAry);
				}
				secondObjAry.push(obj);
			}
			else{
				var firstObjAry:Array<gameobject.GameObject> = this._objectFirstPoolMap.getValueByKey(objType);
				if(firstObjAry == null){
					firstObjAry = new Array<gameobject.GameObject>();
					this._objectFirstPoolMap.addValue(objType,firstObjAry);
				}
				firstObjAry.push(obj);
			}
			this._curCacheObjNum += 1;

			if (this._curCacheObjNum >= GameObjectFactory.MAX_CACHE_NUM) {
				this.cleanCachePool();
			}
		}

		/*清理资源池 清理所有一级缓存* */
		private cleanCachePool(): void {
			var i:number = 0;
			for(i = 0;i < this._objectFirstPoolMap.length;i++){
				var objAry:Array<gameobject.GameObject> = this._objectFirstPoolMap.getValueByIndex(i);
				if(objAry == null){
					console.assert(false,"数组为空");
					continue;
				}
				if(objAry.length <= 0){
					continue;
				}
				for(var j:number = 0;j < objAry.length;j++){
					var obj:gameobject.GameObject = objAry[j];
					if(obj == null){
						continue;
					}
					obj.dispose();
					obj = null;					
					this._curCacheObjNum -= 1;
				}
				objAry.splice(0,objAry.length);				
			}		

			if(this._curCacheObjNum >= GameObjectFactory.MAX_CACHE_NUM)	{
				this.deepCleanCachePool();
			}
		}

		/**深度清理二级缓存 一般是不存在这种情况*/
		private deepCleanCachePool():void{

		}

		private findObjInPool(objType: number): gameobject.GameObject {
			var gameObj: gameobject.GameObject = null;
			var gameFirstObjAry: Array<gameobject.GameObject> = this._objectFirstPoolMap.getValueByKey(objType);

			var gameSecondObjAry: Array<gameobject.GameObject> = this._objectSecondPoolMap.getValueByKey(objType);
			if ((gameSecondObjAry == null || gameSecondObjAry.length <= 0) && (
				gameFirstObjAry == null || gameFirstObjAry.length <= 0)) {
				return null;
			}
			if(gameSecondObjAry != null && gameSecondObjAry.length > 0){
				gameObj = gameSecondObjAry.shift();
			}
			else if(gameFirstObjAry != null && gameFirstObjAry.length > 0){
				gameObj = gameFirstObjAry.shift();
			}

			if (gameObj == null) {
				return null;
			}

			gameObj.isWaitForDispose = false;

			gameObj.refCount += 1;
			this._curCacheObjNum -= 1;

			return gameObj;
		}

		public dispose(): void {
			this._objClassDic = null;
		}
	}
}