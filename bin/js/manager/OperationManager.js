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
            var cls = this._operationClsDiC.get(operationType);
            return this._registerNum;
        };
        OperationManager.prototype.unregisterOperation = function (registerID) {
        };
        OperationManager._instance = null;
        return OperationManager;
    }());
    manager.OperationManager = OperationManager;
})(manager || (manager = {}));
//# sourceMappingURL=OperationManager.js.map