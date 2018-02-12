/**
* name 
*/
module manager{
	/**广义操作管理器  不光包括己方战机 还包括敌军 存在注册具体操作方式不一样而已 */
	export class OperationManager{
		private static _instance:OperationManager = null;
		private _registeringDic:Dictionary = new Dictionary();
		private _operationClsDiC:Dictionary = new Dictionary();
		private _registerNum:number = 0;
		constructor(){			
			this._operationClsDiC.set(OPERATION_TYPE.MASTER_PANEL,operation.MasterPanelOperation);
		}

		public static get Instance():OperationManager{
			if(this._instance == null){
				this._instance = new OperationManager();
			}
			return this._instance;
		}

		/**注册返回ID 用于反注册使用 */
		public registerOperation(source:gameobject.GameObject,operationType:number):number | null{
			var cls = this._operationClsDiC.get(operationType);
			
			return this._registerNum;
		}

		public unregisterOperation(registerID:number):void{

		}
	}
}