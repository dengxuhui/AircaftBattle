/**
* name 
*/
module gameData{
	/**玩家信息 */
	export class Master{
		public static CONF_PATH:string = "res/config/master.json";

		public static MONEY:string = "money";
		public static ENERGY:string = "energy";
		public static NAME:string = "name";

		private static _instance:Master = null;

		private _dataMap:Map = null;				 
		constructor(){
			this._dataMap = new Map();
			this._dataMap.addValue(Master.MONEY,0);
			this._dataMap.addValue(Master.ENERGY,0);
			this._dataMap.addValue(Master.NAME,"null");
		}

		public static instance():Master{
			if(this._instance == null){
				this._instance = new Master();
			}
			return this._instance;
		}

		public getDataByType(type:string):any{
			if(this._dataMap == null){
				return null;
			}
			return this._dataMap.getValueByKey(type);
		}		

		/**覆盖旧值，更新值 */
		public updateDataByType(value:any,type:string):void{
			if(this._dataMap == null){
				return;
			}
			this._dataMap.addValue(type,value);

			//更新配置文件
			var objData:object = Laya.loader.getRes(Master.CONF_PATH);
			objData[type] = value;
		}

		public initData(data:any):void{
			this._dataMap.addValue(Master.MONEY,data["money"]);
			this._dataMap.addValue(Master.ENERGY,data["energy"]);
			this._dataMap.addValue(Master.NAME,data["name"]);
		}
	}
}