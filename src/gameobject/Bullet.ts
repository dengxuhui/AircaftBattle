/**
* name 
*/
module gameobject {
	import Sprite = laya.display.Sprite;
	export class Bullet extends GameObject {
		private static MOVE_SPEED: number = 5;
		private static BULLET: string = "bullet";
		/**渲染对象 */
		private _render: Sprite = null;
		private _curTexture: laya.resource.Texture = null;

		constructor() {
			super();
			this._render = new Sprite();
			this.addChild(this._render);
		}

		public initialize(): void {
			var tex = manager.AtlasResourceManager.Instance.tryGetTexture(gameobject.GameObject.ATLAS_FLAG,
				this._kindID, this._typeID, this._statusID);
			if (tex == null) {
				manager.AtlasResourceManager.Instance.loadAtlas(
					gameobject.GameObject.ATLAS_FLAG, this._kindID,
					laya.utils.Handler.create(this, this.onLoadAtlasComplete));
			}
			else {
				this.setRenderTexture(tex);
			}
		}

		private onLoadAtlasComplete(): void {
			var tex = manager.AtlasResourceManager.Instance.tryGetTexture(gameobject.GameObject.ATLAS_FLAG,
				this._kindID, this._typeID, this._statusID);
			this.setRenderTexture(tex);
		}

		private setRenderTexture(texture: laya.resource.Texture): void {
			if (texture == null) {
				return;
			}
			//避免高频DC
			if (this._curTexture == null || (this._curTexture != null && this._curTexture.url != texture.url)) {
				this._render.graphics.drawTexture(texture);
				this.size(texture.width, texture.height);
				this._curTexture = texture;
			}
			Laya.timer.frameLoop(1, this, this.update);
		}

		private update(): void {
			if (this._isSelf) {
				if (this.y < 0) {
					this.destorySelf();
				}
				else {
					this.y -= Bullet.MOVE_SPEED;
					this.checkHit();
				}
			}
			else {
				if (this.y > Laya.stage.height) {
					this.destorySelf();
				}
				else {
					this.y += Bullet.MOVE_SPEED;
				}
			}
		}

		private destorySelf(): void {
			if (this.parent != null) {
				this.parent.removeChild(this);
			}
			Laya.timer.clear(this, this.update);
			gameobject.GameObjectFactory.instance().disposeObj(this)
		}

		private checkHit(): void {
			var enemys: Dictionary = manager.BattleLogicManager.instance().allEnemys;
			if (enemys == null || enemys.values.length <= 0) {
				return;
			}
			for (var i: number = 0; i < enemys.values.length; i++) {
				var enemy: gameobject.AircarftPanel = enemys.values[i];
				if (this.getBounds().intersects(enemy.getBounds())) {
					manager.BattleLogicManager.instance().setEnemyHurt(enemys.keys[i]);
					this.destorySelf();
					return;
				}
			}
		}
	}
}