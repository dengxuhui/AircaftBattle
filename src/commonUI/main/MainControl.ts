/**
* name 
*/
module commonUI{
	export class MainControl extends BaseUIControl{
		constructor(){
			super();
		}

		public onShow():void{
			var view:MainView = this._viewCenter.getView(MainView);
			if(view == null){
				return;
			}			
			view.btnStart.clickHandler = laya.utils.Handler.create(this,this.onClickStart);
			view.aniShowAircarft.play(0,true);
		}


		private onClickStart(e:Event):void{
			UICenter.instance().closeUI(UI.Main);

			UICenter.instance().openUI(UI.GameScene);
		}
	}
}