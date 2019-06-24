class Player{
    constructor(cell, color){
        this.cell = cell;
        this.color = color;
    }

    draw(){
        fill(this.color);
        console.log(cells[this.cell], this.cell);
        circle(cells[this.cell].getCenter().x, cells[this.cell].getCenter().y, 20);
    }

    move(times){
        if(this.cell + times <= cell_in_a_row * cell_in_a_coloum){
            for(let i = 0; i < times; i++){
                this.cell ++;
                this.draw();
            }
        }
        if(snakes[this.cell]) this.cell = snakes[this.cell];
        if(ladders[this.cell]) this.cell = ladders[this.cell];
    }
}