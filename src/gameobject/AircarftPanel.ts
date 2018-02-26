/**
* name 
*/
module gameobject{
	import Sprite = laya.display.Sprite;
	export class AircarftPanel extends GameObject{
		private static ATTR_NAME:string = "panel";

		private _render:Sprite = null;
		private _curDir:number = DIRECTION.UP;
		private _attrID:number = -1;
		private _typeID:number = -1;
		private _uID:number = -1;
		private _bulletMgr:manager.BulletCreatorManager = null;
		private _curTexture:laya.resource.Texture = null;

		constructor(){
			super();
			this._render = new Sprite();							
			this.addChild(this._render);	
		}

		public get typeID():number{
			return this._typeID;
		}

		public get attrID():number{
			return this._attrID;
		}

		public get isSelf():boolean{
			return this._isSelf;
		}

		public setData(data:any):void{
			this._isSelf = data["isSelf"];	
			this._attrID = data["attrID"];
			this._typeID = data["typeID"];

			var tex = manager.AtlasResourceManager.Instance.tryGetTexture(
				manager.AtlasResourceManager.AIRCRAFT_PANEL,AircarftPanel.ATTR_NAME,this._attrID,this._typeID);
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
			//避免高频DC
			if(this._curTexture == null || (this._curTexture != null && this._curTexture.url != texture.url)){
				this._render.graphics.drawTexture(texture);
				this.size(texture.width,texture.height);	
			}			
			
			if(this._isSelf){
				this._uID = manager.OperationManager.Instance.registerOperation(this,OPERATION_TYPE.MASTER_PANEL);
			}
			else{
				this._uID = manager.OperationManager.Instance.registerOperation(this,OPERATION_TYPE.ENEMY_PANEL);
			}
			this._bulletMgr = new manager.BulletCreatorManager(this);			
		}

		public get uID():number{
			return this._uID;
		}

		public dispose():void{
			manager.OperationManager.Instance.unregisterOperation(this._uID);
			if(this._bulletMgr != null){
				this._bulletMgr.dispose();
			}			
		}
	}
}