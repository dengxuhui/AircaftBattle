/**
* name
*/
var gameData;
(function (gameData) {
    var BattleData = /** @class */ (function () {
        function BattleData() {
            this._panelNum = 0;
        }
        BattleData.prototype.onBattle = function () {
            this._panelNum = gameData.Master.instance().getDataByType(gameData.Master.DEFAULT_PANEL_NUM);
        };
        BattleData.prototype.offBattle = function () {
            this._panelNum = 0;
        };
        return BattleData;
    }());
    gameData.BattleData = BattleData;
})(gameData || (gameData = {}));
//# sourceMappingURL=BattleData.js.map