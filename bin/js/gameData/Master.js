/**
* name
*/
var gameData;
(function (gameData) {
    /**玩家信息 */
    var Master = /** @class */ (function () {
        function Master() {
            this._dataMap = null;
            this._dataMap = new Map();
            this._dataMap.addValue(Master.MONEY, 0);
            this._dataMap.addValue(Master.ENERGY, 0);
            this._dataMap.addValue(Master.NAME, "null");
        }
        Master.instance = function () {
            if (this._instance == null) {
                this._instance = new Master();
            }
            return this._instance;
        };
        Master.prototype.getDataByType = function (type) {
            if (this._dataMap == null) {
                return null;
            }
            return this._dataMap.getValueByKey(type);
        };
        /**覆盖旧值，更新值 */
        Master.prototype.updateDataByType = function (value, type) {
            if (this._dataMap == null) {
                return;
            }
            this._dataMap.addValue(type, value);
            //更新配置文件
            var objData = Laya.loader.getRes(Master.CONF_PATH);
            objData[type] = value;
        };
        Master.prototype.initData = function (data) {
            this._dataMap.addValue(Master.MONEY, data["money"]);
            this._dataMap.addValue(Master.ENERGY, data["energy"]);
            this._dataMap.addValue(Master.NAME, data["name"]);
        };
        Master.CONF_PATH = "res/config/master.json";
        Master.MONEY = "money";
        Master.ENERGY = "energy";
        Master.NAME = "name";
        Master._instance = null;
        return Master;
    }());
    gameData.Master = Master;
})(gameData || (gameData = {}));
//# sourceMappingURL=Master.js.map