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

			var obj:gameobject.GameObject = gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.BULLET);
			obj.event(gameobject.GameObjectEvent.CANCEL_DISPOSE,["hahah","ddd"]);
		}


		private onClickStart(e:Event):void{
			UICenter.instance().closeUI(UI.Main);

			UICenter.instance().openUI(UI.GameScene);
		}
	}
}