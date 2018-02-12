/**
* name 
*/
module manager{	
	export class AtlasResourceManager{
		private static _instance:AtlasResourceManager = null;
		private _curLoadAtlasDic:Dictionary = new Dictionary();
		constructor(){

		}

		/**获取实例 */
		public static get Instance():AtlasResourceManager{
			if(this._instance == null){
				this._instance = new AtlasResourceManager();
			}
			return this._instance;
		}

		/**加载图集 */
		public loadAtlas(url:string,onComplete:laya.utils.Handler = null):void{
			var atlasName:string = url.match("/:([^/]+?)./")[0];
			Laya.loader.load(url,laya.utils.Handler.create(this,this.onLoadComplete,[onComplete]),null,Laya.Loader.ATLAS);
		}

		private onLoadComplete(callBack:laya.utils.Handler):void{
			if(callBack != null){
				callBack.caller();
			}
		}

	}
}