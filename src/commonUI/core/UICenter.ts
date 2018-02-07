/*
* name;
*/
class UICenter extends BaseUICenter{

    private static _instance:UICenter = null;
    constructor(){
        super();
    }

    public static instanc():UICenter{
        if(this._instance == null){
            this._instance = new UICenter();
        }
        return this._instance;
    }
}