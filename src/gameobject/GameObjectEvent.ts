/**
* name 
*/
module gameobject{
	import Event = laya.events.Event;
	export class GameObjectEvent extends Event{

		public static REQUEST_DISPOSE:string = "REQUEST_DISPOSE";

		public static CANCEL_DISPOSE:string = "CANCEL_DISPOSE";

		public static DISPOSE:string = "DISPOSE";		

		private _objType:number;

		constructor(type:string,objType:number){
			super();
			this.type = type;
			this._objType = objType;
		}

		public get objType():number{
			return this._objType;
		}
	}
}