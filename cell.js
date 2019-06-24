class Cell {
    constructor(x, y, height, width, color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    draw(){
        stroke(0);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
    getCenter(){
        return {x: this.x + this.width / 2, y: this.y + this.height / 2};
    }
}