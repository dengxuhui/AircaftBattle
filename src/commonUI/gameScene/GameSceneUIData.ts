/**
* name 
*/
module commonUI{
	export class GameSceneUIData extends laya.events.EventDispatcher implements BaseUIData{
		
		public curEnemy:any = null;

		constructor(){
			super();
		}

		public dispose():void{
			this.curEnemy = null;
		}
	}
}