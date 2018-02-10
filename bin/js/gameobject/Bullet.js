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
var gameobject;
(function (gameobject) {
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        function Bullet() {
            return _super.call(this) || this;
        }
        Bullet.prototype.setData = function (data) {
        };
        return Bullet;
    }(gameobject.GameObject));
    gameobject.Bullet = Bullet;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=Bullet.js.map