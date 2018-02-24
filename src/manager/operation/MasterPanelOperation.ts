/**
* name 
*/
module operation{
	import Rectangle  = Laya.Rectangle;
	export class MasterPanelOperation extends BaseOperation{
		private _isLock:boolean = true;
		private _dragRect:Rectangle = null;
		constructor(){
			super();
			this._dragRect = new Rectangle(0,0,Laya.stage.width,Laya.stage.height);			
		}

		public register(soure:gameobject.GameObject):void{
			this._source = soure;
			this._source.on(Laya.Event.MOUSE_DOWN,this,this.onDrag);
			// this._source.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
		}

		private onDrag(e:Laya.Event):void{			
			this._source.startDrag(this._dragRect);
			// this._source.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
		}		

		//用于检测移动方向  改变texture
		// private onMouseUp(e:Laya.Event):void{
		// 	this._source.off(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
		// }

		// private onMouseMove(e:Laya.Event):void{
		// 	// this._source
		// }

		public unregister():void{
			if(this._source == null){
				return;
			}			
			this._source.off(Laya.Event.MOUSE_DOWN,this,this.onDrag);			
		}
	}
}