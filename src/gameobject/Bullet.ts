/**
* name 
*/
module gameobject{
	export class Bullet extends GameObject{
		constructor(){
			super();
			this.on(gameobject.GameObjectEvent.CANCEL_DISPOSE,this,this.onCancelDispose)
		}

		private onCancelDispose(e:any,d:any):void{
			var a:number = 0;
			if(a == 0){
				console.log(e);
			}
			console.log("right");
		}

	}
}