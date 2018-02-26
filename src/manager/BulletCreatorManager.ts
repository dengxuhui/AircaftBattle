/**
* name 
*/
module manager{
	/**所有飞机不管自己还是敌人的子弹创建速度都保持一致 */
	export class BulletCreatorManager{

		private _host:gameobject.AircarftPanel = null;
		private _bulletType:number;
		private _bulletAttr:number;
		private _isSelf:boolean;
		private _data:object = null;		

		constructor(host:gameobject.AircarftPanel){
			if(host == null){
				console.assert(false,"宿主对象为空");
				return;
			}
			this._host = host;
			this._bulletAttr = host.attrID;
			this._bulletType = host.typeID;
			this._isSelf = host.isSelf;
			this._data = {attrID:this._bulletAttr,typeID:this._bulletType,isSelf:this._isSelf};

			manager.AtlasResourceManager.Instance.loadAtlas(AtlasResourceManager.BULLET,
			laya.utils.Handler.create(this,this.startCreate));
		}

		private startCreate():void{
			Laya.timer.loop(250,this,this.create);			
		}		

		private create():void{
			var bullet:gameobject.Bullet = 
			gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.BULLET,this._data);
			
			bullet.pos(this._host.x + this._host.width / 2,this._host.y - bullet.height / 2);			
			manager.LayerManager.instance().addToLayer(bullet,LAYER.BATTLE);			
		}

		public dispose():void{
			Laya.timer.clearAll(this);
		}
	}
}