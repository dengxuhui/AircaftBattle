/**
* name 
*/
module manager{
	import Sprite = laya.display.Sprite;
	export class LayerManager{
		private static _instance:LayerManager = null;
		private _layerMap:Map = null;

		constructor(){
			this._layerMap = new Map();
			this._layerMap.addValue(LAYER.MAIN,new Sprite());
			this._layerMap.addValue(LAYER.BATTLE,new Sprite());
			this._layerMap.addValue(LAYER.ACTIVITY,new Sprite());
			this._layerMap.addValue(LAYER.POP,new Sprite());

			this.initLayer();
		}

		private initLayer():void{
			if(this._layerMap == null){
				console.assert(false,"map == null");
				return;
			}
			for(var i:number = 0;i < this._layerMap.length;i++){
				var sp:Sprite = this._layerMap.getValueByIndex(i);
				sp.mouseEnabled = true;
				sp.mouseThrough = true;
				Laya.stage.addChild(sp);
			}
		}

		public static instance():LayerManager{
			if(this._instance == null){
				this._instance = new LayerManager();				
			}
			return this._instance;
		}

		/**标记：临时接口  测试用 */
		public getLayer(layerType:number):Sprite{
			return this._layerMap.getValueByKey(layerType);
		}

		public addToLayer(source:Sprite,layerType:number):void{
			if(this._layerMap == null){
				return;
			}
			var layer:Sprite = this._layerMap.getValueByKey(layerType);
			if(layer != null){
				layer.addChild(source);
			}
		}

		public removeFromLayer(source:Sprite,layerType:number):void{
			if(this._layerMap == null){
				return;
			}
			var layer:Sprite = this._layerMap.getValueByKey(layerType);
			if(layer != null){
				layer.removeChild(source);				
			}
		}
	}
}