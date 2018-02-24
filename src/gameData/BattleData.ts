/**
* name 
*/
module gameData{
	export class BattleData{
		private _panelNum:number = 0;
		constructor(){

		}

		public onBattle():void{
			this._panelNum = Master.instance().getDataByType(Master.DEFAULT_PANEL_NUM);
		}

		public offBattle():void{
			this._panelNum = 0;
		}
	}
}