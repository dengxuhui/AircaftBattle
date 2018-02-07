/*
* name;
*/
class BaseUIManager{
    
    public id:number = 0;

    private _resDatas:Array<ResData> = new Array<ResData>();
    private _onInitedCallBack:Function = null;
    protected _dataCenter:UIDataCenter = null;
    protected _viewCenter:UIViewCenter = null;
    protected _controlCenter:UIControlCenter = null;

    constructor(){
        this._dataCenter = new UIDataCenter();
        this._viewCenter = new UIViewCenter();
        this._controlCenter = new UIControlCenter(this,this._dataCenter,this._viewCenter);
    }

    public dispose():void{
        if(this._controlCenter != null){
            this._controlCenter.dispose();
            this._controlCenter = null;
        }
        if(this._viewCenter != null){
            this._viewCenter.dispose();
            this._viewCenter = null;
        }
        if(this._dataCenter != null){
            this._dataCenter.dispose();
            this._dataCenter = null;
        }
    }

    public open(onInitCallBack:Function):void{

    }    

    public setOpenParam(className:any):void{
        if(this._dataCenter == null){
            return;
        }
        this._dataCenter.setOpenParam(className);
    }
}