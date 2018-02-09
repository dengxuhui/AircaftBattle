var LAYER;
(function (LAYER) {
    LAYER[LAYER["MAIN"] = 0] = "MAIN";
    LAYER[LAYER["ACTIVITY"] = 1] = "ACTIVITY";
    LAYER[LAYER["POP"] = 2] = "POP";
})(LAYER || (LAYER = {}));
/**游戏物体类型 */
var GAMEOJB_TYPE;
(function (GAMEOJB_TYPE) {
    /**子弹 */
    GAMEOJB_TYPE[GAMEOJB_TYPE["BULLET"] = 0] = "BULLET";
})(GAMEOJB_TYPE || (GAMEOJB_TYPE = {}));
/**子弹类型 */
var GAMEOBJECT_BULLET;
(function (GAMEOBJECT_BULLET) {
    /**x射线 */
    GAMEOBJECT_BULLET[GAMEOBJECT_BULLET["X_RAY"] = 0] = "X_RAY";
    GAMEOBJECT_BULLET[GAMEOBJECT_BULLET["POINT"] = 1] = "POINT";
})(GAMEOBJECT_BULLET || (GAMEOBJECT_BULLET = {}));
/**x射线等级 */
var X_RAY;
(function (X_RAY) {
    X_RAY[X_RAY["LEVE_0"] = 0] = "LEVE_0";
    X_RAY[X_RAY["LEVE_1"] = 1] = "LEVE_1";
    X_RAY[X_RAY["LEVE_2"] = 2] = "LEVE_2";
})(X_RAY || (X_RAY = {}));
//# sourceMappingURL=GlobConst.js.map