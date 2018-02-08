/*
* name;
*/
class UICenter extends BaseUICenter{

    private static _instance:UICenter = null;
    constructor(){
        super();
        
        this.addManager(UI.Main,commonUI.MainManager);
    }

    public static instance():UICenter{
        if(this._instance == null){
            this._instance = new UICenter();
        }
        return this._instance;
    }
}