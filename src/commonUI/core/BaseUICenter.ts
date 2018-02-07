
/*
* name;
*/
class BaseUICenter{

    protected _managers:Map = null;
    protected _openingUI:Array<number> = null;

    constructor(){
        this._managers = new Map();
        this._openingUI = new Array<number>();
    }

    public addManager(id:number,className:any):void{
        if(className == null){
            return;
        }
        var manager:BaseUIManager = new className();
        manager.id = id;            
        this._managers.addValue(id,manager);
    }

    public getManager(id:number):any{
        if(this._managers == null){
            return null;
        }
        return this._managers.getValueByKey(id);
    }   

    public isExist(id:number):boolean{
        if(this._managers == null){
            return false;
        }
        return this._managers.isExist(id);
    }

    public openUI(id:number):void{
        var manager:BaseUIManager = this.getManager(id);
        if(manager != null){
            // manager.
        }        
    }    

    private onUIinitCallBack(id:number):void{
        this._openingUI.push(id);
    }

    public dispose():void{
        if(this._managers != null){
            for(var i:number = 0;i < this._managers.length;i++){
                var manager:BaseUIManager = this._managers.getValueByIndex(i);
                if(manager != null){
                    manager.dispose();
                    manager = null;
                }
            }
            this._managers.dispose();
            this._managers = null;
        }
    }
}