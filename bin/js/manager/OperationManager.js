/**
* name
*/
var manager;
(function (manager) {
    /**广义操作管理器  不光包括己方战机 还包括敌军 存在注册具体操作方式不一样而已 */
    var OperationManager = /** @class */ (function () {
        function OperationManager() {
            this._registeringDic = new Dictionary();
            this._operationClsDiC = new Dictionary();
            this._registerNum = 0;
            this._operationClsDiC.set(OPERATION_TYPE.MASTER_PANEL, operation.MasterPanelOperation);
            this._operationClsDiC.set(OPERATION_TYPE.ENEMY_PANEL, operation.EnemyPanelOperation);
        }
        Object.defineProperty(OperationManager, "Instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new OperationManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**注册返回ID 用于反注册使用 */
        OperationManager.prototype.registerOperation = function (source, operationType) {
            var cls;
            if (this._operationClsDiC.indexOf(operationType) == -1) {
                return null;
            }
            else {
                cls = this._operationClsDiC.get(operationType);
            }
            var registerOperation = new cls();
            registerOperation.register(source);
            this._registerNum++;
            this._registeringDic.set(this._registerNum, registerOperation);
            return this._registerNum;
        };
        OperationManager.prototype.unregisterOperation = function (registerID) {
            if (this._registeringDic.indexOf(registerID) == -1) {
                return;
            }
            var register = this._registeringDic.get(registerID);
            if (register != null) {
                register.unregister();
                register = null;
                this._registeringDic.remove(registerID);
            }
        };
        OperationManager._instance = null;
        return OperationManager;
    }());
    manager.OperationManager = OperationManager;
})(manager || (manager = {}));
//# sourceMappingURL=OperationManager.js.map