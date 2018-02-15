/**
* name
*/
var operation;
(function (operation) {
    var BaseOperation = /** @class */ (function () {
        function BaseOperation() {
            this._source = null;
        }
        BaseOperation.prototype.register = function (soure) {
        };
        BaseOperation.prototype.unregister = function () {
        };
        return BaseOperation;
    }());
    operation.BaseOperation = BaseOperation;
})(operation || (operation = {}));
//# sourceMappingURL=BaseOperation.js.map