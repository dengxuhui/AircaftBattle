var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var operation;
(function (operation) {
    var Rectangle = Laya.Rectangle;
    var MasterPanelOperation = /** @class */ (function (_super) {
        __extends(MasterPanelOperation, _super);
        function MasterPanelOperation() {
            var _this = _super.call(this) || this;
            _this._isLock = true;
            _this._dragRect = null;
            _this._dragRect = new Rectangle(0, 0, Laya.stage.width, Laya.stage.height);
            return _this;
        }
        MasterPanelOperation.prototype.register = function (soure) {
            this._source = soure;
            this._source.on(Laya.Event.MOUSE_DOWN, this, this.onDrag);
        };
        MasterPanelOperation.prototype.onDrag = function (e) {
            this._source.startDrag(this._dragRect);
        };
        MasterPanelOperation.prototype.unregister = function () {
            if (this._source == null) {
                return;
            }
            this._source.off(Laya.Event.MOUSE_DOWN, this, this.onDrag);
        };
        return MasterPanelOperation;
    }(operation.BaseOperation));
    operation.MasterPanelOperation = MasterPanelOperation;
})(operation || (operation = {}));
//# sourceMappingURL=MasterPanelOperation.js.map