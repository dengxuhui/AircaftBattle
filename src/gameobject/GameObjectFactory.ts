/**
* name 
*/
module gameobject {
	export class GameObjectFactory extends laya.events.EventDispatcher {

		private static _instance: GameObjectFactory = null;
		private static MAX_CACHE_NUM: number = 1000;
		private _objClassDic: Dictionary = null;
		/**一级缓存用于缓存只被用了一次的资源 */
		private _objectFirstPool: Dictionary = null;
		/**二级缓存用于缓存经常使用的资源，从资源池拿去先从当前资源池拿取 */
		private _objectSecondPool: Dictionary = null;
		private _curCacheObjNum: number = 0;

		constructor() {
			super();
			this._objectFirstPool = new Dictionary();
			this._objectSecondPool = new Dictionary();
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

		public createObject(kindID:number,typeID:number,statusID:number = 0,isSelf:boolean,varsData:object = null): any {
			var gameObj: gameobject.GameObject = null;
			gameObj = this.findObjInPool(kindID,typeID,statusID);
			if (gameObj == null) {
				var className: any = this._objClassDic.get(kindID);
				gameObj = new className();
				gameObj.setData(kindID,typeID,statusID,isSelf,varsData);	
				gameObj.initialize();			
			}
			else {
				gameObj.setData(kindID,typeID,statusID,isSelf,varsData);
				gameObj.initialize();
			}
			return gameObj;
		}

		public disposeObj(obj:gameobject.GameObject): void {
			if (obj == null || obj.kindID < 0) {
				return;
			}
			obj.isWaitForDispose = true;

			if(obj.refCount > 0){//被从资源池重复利用过
				var secondObjDic:Dictionary = this._objectSecondPool.get(obj.kindID);
				if(secondObjDic == null){					
					secondObjDic = new Dictionary();
					this._objectSecondPool.set(obj.kindID,secondObjDic);
				}

				var secondObjAry:Array<gameobject.GameObject> = null;
				if(secondObjDic.indexOf(obj.typeID + "_" + obj.statusID) == -1){
					secondObjAry = new Array<gameobject.GameObject>();
					secondObjAry.push(obj);
					secondObjDic.set(obj.typeID + "_" + obj.statusID,secondObjAry);
				}
				else{
					secondObjAry = secondObjDic.get(obj.typeID + "_" + obj.statusID);
					secondObjAry.push(obj);
				}				
			}
			else{
				var firstObjDic:Dictionary = this._objectFirstPool.get(obj.kindID);
				if(firstObjDic == null){
					firstObjDic = new Dictionary();
					this._objectFirstPool.set(obj.kindID,firstObjDic);
				}

				var firstObjAry:Array<gameobject.GameObject> = null;
				if(firstObjDic.indexOf(obj.typeID + "_" + obj.statusID) == -1){
					firstObjAry = new Array<gameobject.GameObject>();
					firstObjAry.push(obj);
					firstObjDic.set(obj.typeID + "_" + obj.statusID,firstObjAry);
				}
				else{
					firstObjAry = firstObjDic.get(obj.typeID + "_" + obj.statusID);
					firstObjAry.push(obj);
				}				
			}
			this._curCacheObjNum += 1;
			if(obj.parent != null){
				console.log("未删除");
			}
			if (this._curCacheObjNum >= GameObjectFactory.MAX_CACHE_NUM) {
				this.cleanCachePool();
			}
		}

		/*清理资源池 清理所有一级缓存* */
		private cleanCachePool(): void {
			var i:number = 0;
			for(i = 0;i < this._objectFirstPool.values.length;i++){
				var objDic:Dictionary = this._objectFirstPool.values[i];
				if(objDic == null){
					console.assert(false,"数组为空");
					continue;
				}
				if(objDic.values.length <= 0){
					continue;
				}
				for(var j:number = 0;j < objDic.values.length;j++){
					var objAry:Array<gameobject.GameObject> = objDic.values[j];
					if(objAry == null || objAry.length <= 0){
						continue;
					}					
					for(var k:number = 0;k < objAry.length;k++){
						var obj:gameobject.GameObject = objAry[k];
						if(obj == null){
							continue;
						}
						obj.dispose();
						obj = null;
						this._curCacheObjNum -= 1;						
					}					
					objAry.splice(0,objAry.length);
				}				
			}		

			if(this._curCacheObjNum >= GameObjectFactory.MAX_CACHE_NUM)	{
				this.deepCleanCachePool();
			}
		}

		/**深度清理二级缓存 一般是不存在这种情况*/
		private deepCleanCachePool():void{

		}

		private findObjInPool(kindID:number,typeID:number,statusID:number): gameobject.GameObject {
			var gameObj: gameobject.GameObject = null;
			var gameFirstObjDic:Dictionary = this._objectFirstPool.get(kindID);

			var gameSecondObjDic: Dictionary = this._objectSecondPool.get(kindID);

			if ((gameSecondObjDic == null || gameSecondObjDic.values.length <= 0) && (
				gameFirstObjDic == null || gameFirstObjDic.values.length <= 0)) {
				return null;
			}
			var gameObjAry:Array<gameobject.GameObject> = null;

			if(gameSecondObjDic != null && gameSecondObjDic.values.length > 0){
				if(gameSecondObjDic.indexOf(typeID + "_" + statusID) != -1){					
					gameObjAry = gameSecondObjDic.get(typeID + "_" + statusID);
					if(gameObjAry != null && gameObjAry.length > 0){
						gameObj = gameObjAry.shift();
					}
				}
				if(gameObj == null){					
					gameObjAry = gameFirstObjDic.get(typeID + "_" + statusID);
					if(gameObjAry != null && gameObjAry.length > 0){
						gameObj = gameObjAry.shift();
					}
				}
			}
			else if(gameFirstObjDic != null && gameFirstObjDic.values.length > 0){
				gameObjAry = gameFirstObjDic.get(typeID + "_" + statusID);
				if(gameObjAry != null && gameObjAry.length > 0){
					gameObj = gameObjAry.shift();
				}
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