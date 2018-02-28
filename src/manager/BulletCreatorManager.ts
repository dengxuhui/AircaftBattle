/**
* name 
*/
module manager{
	/**所有飞机不管自己还是敌人的子弹创建速度都保持一致 */
	export class BulletCreatorManager{

		private _host:gameobject.AircarftPanel = null;
		private _typeID:number;
		private _kindID:number;
		private _statusID:number;
		private _isSelf:boolean;
		private _data:object = null;		

		constructor(host:gameobject.AircarftPanel){
			if(host == null){
				console.assert(false,"宿主对象为空");
				return;
			}
			this._host = host;
			this._kindID = GAMEOBJ_TYPE.BULLET;
			this._typeID = host.typeID;
			this._isSelf = host.isSelf;
			this._statusID = host.statusID;

			this._data = {kindID:this._kindID,typeID:this._typeID,isSelf:this._isSelf,statusID:this._statusID};

			manager.AtlasResourceManager.Instance.loadAtlas(gameobject.GameObject.ATLAS_FLAG,this._kindID,
			laya.utils.Handler.create(this,this.startCreate));
		}

		private startCreate():void{
			Laya.timer.loop(250,this,this.create);			
		}		

		private create():void{
			var bullet:gameobject.Bullet = 
			gameobject.GameObjectFactory.instance().createObject(GAMEOBJ_TYPE.BULLET,this._data);
			
			bullet.pos(this._host.x + this._host.width / 2,this._host.y - bullet.height / 2);			
			manager.LayerManager.instance().addToLayer(bullet,LAYER.BATTLE);			
		}

		public dispose():void{
			Laya.timer.clearAll(this);
		}
	}
}