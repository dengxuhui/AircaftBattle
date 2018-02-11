/**
* name 
*/
module gameobject{
	import Sprite = laya.display.Sprite;
	export class Bullet extends GameObject{
		/**渲染对象 */
		private _render:Sprite = null;

		constructor(){
			super();			
			this._render = new Sprite();
			this.addChild(this._render);
		}

		public setData(data:any):void{
			var skin:string = data.skin;
			var texture:any = Laya.loader.getRes(skin);
			this._render.graphics.drawTexture(texture);
		}
	}
}