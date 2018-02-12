/*
* name;
*/
class UICenter extends BaseUICenter{

    private static _instance:UICenter = null;
    constructor(){
        super();
        
        this.addManager(UI.Main,commonUI.MainManager);
        this.addManager(UI.GameScene,commonUI.GameSceneManager);
    }

    public static instance():UICenter{
        if(this._instance == null){
            this._instance = new UICenter();
        }
        return this._instance;
    }

    public addManager(id:number,className:any):void{
        if(className == null){
            return;
        }
        var manager:BaseUIManager = new className();
        manager.id = id;            
        this._managers.addValue(id,manager);
    }
}