/**
* name 
*/
module gameobject{
	import Sprite = laya.display.Sprite;
	export class Bullet extends GameObject{
		private static MOVE_SPEED:number = 5;
		private static BULLET:string = "bullet";
		/**渲染对象 */
		private _render:Sprite = null;
		private _attrID:number;
		private _typeID:number;		
		private _curTexture:laya.resource.Texture = null;

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
				manager.AtlasResourceManager.AIRCRAFT_PANEL,Bullet.BULLET,this._attrID,this._typeID);
			this.setRenderTexture(tex);
		}

		private setRenderTexture(texture:laya.resource.Texture):void{
			if(texture == null){
				return;
			}
			//避免高频DC
			if(this._curTexture == null || (this._curTexture != null && this._curTexture.url != texture.url)){
				this._render.graphics.drawTexture(texture);
				this.size(texture.width,texture.height);			
				this._curTexture = texture;
			}
			Laya.timer.frameLoop(1,this,this.update);
		}

		private update():void{
			if(this._isSelf){
				if(this.y < 0){
					if(this.parent != null){
						this.parent.removeChild(this);
					}
					Laya.timer.clear(this,this.update);
					gameobject.GameObjectFactory.instance().disposeObj(this,GAMEOJB_TYPE.BULLET);					
				}
				else{
					this.y -= Bullet.MOVE_SPEED;
				}
			}
			else{
				if(this.y > Laya.stage.height){
					if(this.parent != null){
						this.parent.removeChild(this);
					}
					Laya.timer.clear(this,this.update);
					gameobject.GameObjectFactory.instance().disposeObj(this,GAMEOJB_TYPE.BULLET);
				}
				else{
					this.y += Bullet.MOVE_SPEED;
				}
			}
		}
	}
}