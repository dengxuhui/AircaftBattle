/**
* name 
*/
module commonUI{
	export class GameSceneControl extends BaseUIControl{
		private _rollBgAry:Array<any> = null;
		constructor(){
			super();
		}

		public onShow():void{
			var uiData:commonUI.GameSceneUIData = this._dataCenter.getData(commonUI.GameSceneUIData);
			var view:commonUI.GameSceneView = this._viewCenter.getView(commonUI.GameSceneView);
			if(uiData != null && view != null){
				view.progressCurEnemyHp.visible = uiData.curEnemy != null;
			}
			this._rollBgAry = new Array<any>();
			this._rollBgAry.push(view.imgBg);
			var scBg:Laya.Image = new Laya.Image(view.imgBg.skin);
			scBg.y = -Laya.stage.height;
			view.addChild(scBg);
			this._rollBgAry.push(scBg);

			this.startRollBg();

			//改逻辑应由一个状态栈所控制，这里为了简化 直接通过UI控制战斗逻辑入口开始及初始化
			manager.BattleLogicManager.instance().inintBattleLoagic();
		}

		public onHide():void{
			manager.BattleLogicManager.instance().uninitBattleLogic();
		}

		private static MOVE_SPEED:number = 2;

		private startRollBg():void{
			Laya.timer.frameLoop(1,this,this.moveBg)
		}

		private moveBg():void{
			for(var i:number = 0;i < this._rollBgAry.length;i++){
				var img:Laya.Image = this._rollBgAry[i];
				img.y += GameSceneControl.MOVE_SPEED;
			}
			var firstImg:Laya.Image = this._rollBgAry[0];
			if(firstImg.y >= Laya.stage.height){
				firstImg.y = this._rollBgAry[1].y - this._rollBgAry[1].height;
				this._rollBgAry.push(this._rollBgAry.shift());
			}			
		}
	}
}