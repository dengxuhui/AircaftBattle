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
/*
* name;
*/
var UICenter = /** @class */ (function (_super) {
    __extends(UICenter, _super);
    function UICenter() {
        return _super.call(this) || this;
    }
    UICenter.instanc = function () {
        if (this._instance == null) {
            this._instance = new UICenter();
        }
        return this._instance;
    };
    UICenter._instance = null;
    return UICenter;
}(BaseUICenter));
//# sourceMappingURL=UICenter.js.map