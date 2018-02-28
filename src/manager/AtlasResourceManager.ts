/**
* name 
*/
module manager{	
	import Texture = laya.resource.Texture;
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
		public loadAtlas(flagName:string,kindID:number,onComplete:laya.utils.Handler = null):void{
			var url = "res/atlas/" + flagName + "_" + kindID + ".atlas";
			//TODO 更改为正则表达式			
			var atlasNameAry:string[] = url.split(".")[0].split("/");
			var atlasName:string = atlasNameAry[atlasNameAry.length - 1];
			
			if(this._curLoadAtlasDic.indexOf(atlasName) == -1){
				Laya.loader.load(url,laya.utils.Handler.create(this,this.onLoadComplete,[onComplete,atlasName]),null,Laya.Loader.ATLAS);
			}
			else{
				if(onComplete != null){
					onComplete.run();
				}
			}
		}

		public tryGetTexture(flagName:string,kindID:number,typeID:number,statusID:number = 0):Texture{
			var tex:Texture = null;
			if(this._curLoadAtlasDic.indexOf(flagName + "_" + kindID) == -1){				
				return null;
			}
			var urlAry = Laya.Loader.getAtlas("res/atlas/" + flagName + "_" + kindID + ".atlas");
			if(urlAry.length <= 0){
				console.assert(false,"图集url输入错误");
				return null;
			}
			var texUrl:string = flagName + "_" + kindID + "_" + typeID + "_" + statusID;
			for(var i:number = 0;i < urlAry.length;i++){
				var url = urlAry[i];
				if(url.indexOf(texUrl) != -1){
					tex = Laya.Loader.getRes(url);
					break;
				}
			}
			return tex;
		}

		private onLoadComplete(callBack:laya.utils.Handler,atlasName:string):void{
			if(this._curLoadAtlasDic != null){
				this._curLoadAtlasDic.set(atlasName,atlasName);
			}
			if(callBack != null){
				callBack.run();
			}
		}
	}
}