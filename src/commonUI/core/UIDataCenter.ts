/*
* name;
*/
class UIDataCenter{

    protected _datas:Map = new Map();
    private _isLoading:boolean = false;
    private _isLoaded:boolean = false;
    private _isOpened:boolean = false;
    private _openParamClass:any = null;
    private _openParam:UIOpenParam = null;
    constructor(){

    }

    public setOpenParam(className:any):void{

    }

    public dispose():void{
        if(this._datas != null){
            for(var i:number = 0;i < this._datas.length;i++){
                var data:BaseUIData = this._datas.getValueByIndex(i);
                if(data != null){
                    data.dispose();
                    data = null;                     
                }
            }
            this._datas.dispose();
            this._datas = null;            
        }        
        if(this._openParam != null){
            this._openParam.reset();
            this._openParam = null;
        }
    }
}