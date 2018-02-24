/**
* name 
*/
module gameobject{
	import Sprite = laya.display.Sprite;
	export class Bullet extends GameObject{
		private static BULLET:string = "bullet";
		/**渲染对象 */
		private _render:Sprite = null;
		private _attrID:number;
		private _typeID:number;		

		constructor(){
			super();			
			this._render = new Sprite();
			this.addChild(this._render);
		}

		public setData(data:any):void{
			this._attrID = data["attrID"];
			this._typeID = data["typeID"];
			this._isSelf = data["isSelf"];

			var tex = manager.AtlasResourceManager.Instance.tryGetTexture(
				manager.AtlasResourceManager.BULLET,Bullet.BULLET,this._attrID,this._typeID);
			if(tex == null){
				manager.AtlasResourceManager.Instance.loadAtlas(
				manager.AtlasResourceManager.AIRCRAFT_PANEL,
				laya.utils.Handler.create(this,this.onLoadAtlasComplete));
			}
			else{
				this.setRenderTexture(tex);
			}
		}

		private onLoadAtlasComplete():void{
			var tex = manager.AtlasResourceManager.Instance.tryGetTexture(
				manager.AtlasResourceManager.AIRCRAFT_PANEL,AircarftPanel.ATTR_NAME,this._attrID,this._typeID);
			this.setRenderTexture(tex);
		}

		private setRenderTexture(texture:laya.resource.Texture):void{
			if(texture == null){
				return;
			}
			this._render.graphics.drawTexture(texture);
			this.size(texture.width,texture.height);			
		}
	}
}