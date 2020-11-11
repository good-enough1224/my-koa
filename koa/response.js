module.exports = {
    get body(){
        return this.res.body
    },
    set body(value){
        this._body = value 
    },
}