/**
* name 
*/
module gameobject{
	import Sprite = laya.display.Sprite;
	export class AircarftPanel extends GameObject{
		private _render:Sprite = null;
		private _curDir:number = DIRECTION.UP;
		constructor(){
			super();
			this._render = new Sprite();			
			this.addChild(this._render);
			if(laya.utils.Browser.onPC){
				this.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
			}
		}

		private onMouseMove(arg:any):void{
			console.log(arg);
		}

		public setData(data:any):void{
			this._isSelf = data["isSelf"];	

			var skinAry = Laya.Loader.getAtlas("res/atlas/comp.atlas");
			var tex:any = Laya.Loader.getRes(skinAry[4]);
			this._render.graphics.drawTexture(tex);								
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