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
			this._operationClsDiC.set(OPERATION_TYPE.ENEMY_PANEL,operation.EnemyPanelOperation);
		}

		public static get Instance():OperationManager{
			if(this._instance == null){
				this._instance = new OperationManager();
			}
			return this._instance;
		}

		/**注册返回ID 用于反注册使用 */
		public registerOperation(source:gameobject.GameObject,operationType:number):number | null{
			var cls;
			if(this._operationClsDiC.indexOf(operationType) == -1){
				return null;
			}
			else{
				cls = this._operationClsDiC.get(operationType);
			}
			var registerOperation:operation.BaseOperation = new cls();
			registerOperation.register(source);
			this._registerNum ++;
			this._registeringDic.set(this._registerNum,registerOperation);			
			return this._registerNum;
		}

		public unregisterOperation(registerID:number):void{
			if(this._registeringDic.indexOf(registerID) == -1){
				return;
			}
			var register:operation.BaseOperation = this._registeringDic.get(registerID);
			if(register != null){
				register.unregister();
				register = null;

				this._registeringDic.remove(registerID);
			}			
		}
	}
}