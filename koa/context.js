module.exports = {
    get body(){
        return this._body
    },
    set body(value){
        this._body = value 
    },
    get url(){
        return this.req.url
    },
    get method(){
        return this.req.method
    }
}