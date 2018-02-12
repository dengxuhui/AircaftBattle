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

		constructor(){
			super();
			this._render = new Sprite();							
			this.addChild(this._render);
			if(laya.utils.Browser.onPC){
				this._render.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
			}
			this._render.on(Laya.Event.MOUSE_DOWN,this,this.onMouseMove);
		}

		private onMouseMove(arg:any):void{
			console.log(arg);
			console.log("dd");
		}

		public setData(data:any):void{
			this._isSelf = data["isSelf"];	
			this._attrID = data["attrID"];
			this._typeID = data["typeID"];

			var tex = manager.AtlasResourceManager.Instance.tryGetTexture(
				manager.AtlasResourceManager.AIRCRAFT_PANEL,AircarftPanel.ATTR_NAME,this._attrID,this._typeID);
			if(tex == null){
				manager.AtlasResourceManager.Instance.loadAtlas("res/atlas/" + 
				manager.AtlasResourceManager.AIRCRAFT_PANEL + ".atlas",
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
			if(texture == null || this._render == null){
				return;
			}
			this._render.graphics.drawTexture(texture);
		}

		/**改变方向 */
		public changeDir(dir:number):void{

			this.changeSkin(dir);
			//最后赋值
			this._curDir = dir;
		}

		/**更改皮肤 */
		private changeSkin(dir:number):void{
			if(this._curDir == dir){
				return;
			}
			switch(dir){
				case DIRECTION.UP:{

				}
				case DIRECTION.DOWN:{

				}
				case DIRECTION.LEFT:{

				}
				case DIRECTION.RIGHT:{

				}
			}
		}

		public get curDir():number{
			return this._curDir;
		}
	}
}