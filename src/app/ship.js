class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.status = true
    }

    hit(){
        if (this.hits < this.length) ++this.hits
        if (this.hits === this.length) this.status = false
    }
}


export { Ship }