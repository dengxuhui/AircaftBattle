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
			this._source.on(Laya.Event.MOUSE_DOWN,this,this.onDrag)
		}

		private onDrag(e:Laya.Event):void{
			this._source.startDrag(this._dragRect);
		}

		public unregister():void{
			if(this._source == null){
				return;
			}			
			this._source.off(Laya.Event.MOUSE_DOWN,this,this.onDrag);
		}
	}
}