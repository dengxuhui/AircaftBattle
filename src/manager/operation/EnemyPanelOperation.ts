/**
* name 
*/
module operation {
	export class EnemyPanelOperation extends BaseOperation {
		private static ENEMY_FLY_SPEED: number = 5;
		private _enemy: gameobject.GameObject = null;

		constructor() {
			super();
		}

		public register(source: gameobject.GameObject): void {
			this._enemy = source;
			if (this._enemy != null) {
				Laya.timer.frameLoop(1, this, this.update);
				manager.BattleLogicManager.instance().on(manager.BattleLogicManager.ENEMY_ON_DESTORY, this, this.onEnemyDestory);
			}
		}

		private onEnemyDestory(panel: gameobject.AircarftPanel): void {
			if (panel.uID == this._enemy.uID) {
				Laya.timer.clear(this, this.update);
				this.destroy();
				this.unregister();
			}
		}

		private destroy(): void {
			if (this._enemy.parent != null) {
				manager.LayerManager.instance().removeFromLayer(this._enemy, LAYER.BATTLE);
			}
			gameobject.GameObjectFactory.instance().disposeObj(this._enemy);
		}

		private update(): void {
			if (this._enemy.y > Laya.stage.height) {
				Laya.timer.clear(this, this.update);
				this.destroy();
				this.unregister();
			}
			else {
				this._enemy.y += EnemyPanelOperation.ENEMY_FLY_SPEED;
			}
		}

		public unregister(): void {
			super.unregister();
			manager.BattleLogicManager.instance().off(manager.BattleLogicManager.ENEMY_ON_DESTORY, this, this.onEnemyDestory);
			Laya.timer.clear(this, this.update);
			this._enemy = null;
		}
	}
}