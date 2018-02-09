/**
* name 
*/
module commonUI{
	export class GameSceneView extends ui.GameSceneUI implements BaseUIView{
		constructor(){
			super();
		}

		public clear():void{

		}

		public onShow():void{
			manager.LayerManager.instance().addToLayer(this,LAYER.MAIN);
		}

		public dispose():void{
			super.destroy();
		}

		public onHide():void{
			manager.LayerManager.instance().removeFromLayer(this,LAYER.MAIN);
		}

		public onInit():void{

		}
	}
}