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

		private _curBullet:Array<gameobject.Bullet> = new Array<gameobject.Bullet>();

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
			Laya.timer.loop(100,this,this.create);
			Laya.timer.frameLoop(1,this,this.update)
		}		

		private create():void{
			var bullet:gameobject.Bullet = 
			gameobject.GameObjectFactory.instance().createObject(GAMEOJB_TYPE.BULLET,this._data);
			
			bullet.pos(this._host.x,this._host.y);
			manager.LayerManager.instance().addToLayer(bullet,LAYER.BATTLE);
			this._curBullet.push(bullet);
		}

		private update():void{
			for(var i:number = 0;i< this._curBullet.length;i++){
				var bullet:gameobject.Bullet = this._curBullet[i];
				if(bullet != null){
					if(this._isSelf){
						if(bullet.y < 0){
							if(bullet.parent != null){
								bullet.parent.removeChild(bullet);
							}
							gameobject.GameObjectFactory.instance().disposeObj(bullet,GAMEOJB_TYPE.BULLET);
							// this._curBullet.splice(i,1);
							// i--;
							bullet = null;
						}
						else{
							bullet.y -= 5;
						}
					}
					else{
						if(bullet.y > Laya.stage.height){
							if(bullet.parent != null){
								bullet.parent.removeChild(bullet);
							}
							gameobject.GameObjectFactory.instance().disposeObj(bullet,GAMEOJB_TYPE.BULLET);
							this._curBullet.splice(i,1);
							i--;
						}
						else{
							bullet.y += 5;
						}
					}
				}
			}
		}

		public dispose():void{
			Laya.timer.clearAll(this);
		}
	}
}