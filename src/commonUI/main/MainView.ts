/**
* name 
*/
module commonUI{
	export class MainView extends ui.MainUI implements BaseUIView{
		constructor(){
			super();
		}

		public dispose():void{
			super.destroy();
		}

		public clear():void{

		}

		public onInit():void{

		}

		public onShow():void{
			manager.LayerManager.instance().addToLayer(this,LAYER.MAIN);
		}

		public onHide():void{
			manager.LayerManager.instance().removeFromLayer(this,LAYER.MAIN);
		}
	}
}