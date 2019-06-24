let cell_in_a_row = 10;
let cell_in_a_coloum = 10;
let cell_height = 0;
let cell_width = 0;

let no_of_player = 2;
let max_snakes = 20;
let max_ladders = 20;

cells = {};
snakes = {};
ladders = {};
players = [];


function setup(){
    createCanvas(500,500);
    cell_height = height / cell_in_a_coloum;
    cell_width = height / cell_in_a_row;
    background(0);
    draw_board();
    draw_snakes(max_snakes);
    draw_ladders(max_ladders);
    initialise_players(no_of_player);
    console.log(snakes);
    console.log(ladders);
}

function draw_board(){
    let x = 0, y = height;
    cell_count = 1;
    for(let i = 0; i < cell_in_a_row; i++){
        y -= cell_height;
        for(let j = 0; j < cell_in_a_coloum; j++){
            let cell = new Cell(x, y, cell_height, cell_width, color(150));
            cell.draw();
            cells[cell_count] = cell;
            fill(0);
            text(cell_count, cell.getCenter().x, cell.getCenter().y);
            cell_count ++;
            if(j != cell_in_a_coloum - 1){
                if(i & 1) x -= cell_width;
                else x += cell_width;
            }
        }
    }
}

function generate_snake_or_ladder(max_range){
    x = parseInt(random(1, max_range));
    y = parseInt(random(x, max_range));
    return {x,y};
}

function draw_snakes(max_snakes){
    snakes = {};
    let no_of_snakes = parseInt(random(max_snakes));
    console.log(no_of_snakes);
    for(let i = 0; i < no_of_snakes; i++){
        cordinates = generate_snake_or_ladder(100);
        snake = new Snake(cells[cordinates.x].getCenter().x, cells[cordinates.x].getCenter().y, cells[cordinates.y].getCenter().x, cells[cordinates.y].getCenter().y, color(255,0,0));
        snake.draw();
        snakes[cordinates.y] = cordinates.x;
    }
}

function draw_ladders(max_ladders){
    ladders = {};
    let no_of_ladders = parseInt(random(max_ladders));
    for(let i = 0; i < no_of_ladders; i++){
        cordinates = generate_snake_or_ladder(100);
        ladder = new Ladder(cells[cordinates.x].getCenter().x, cells[cordinates.x].getCenter().y, cells[cordinates.y].getCenter().x, cells[cordinates.y].getCenter().y, color(0,255,0));
        ladder.draw();
        ladders[cordinates.x] = cordinates.y;
    }
}

function initialise_players(no_of_player){
    for(let i = 0; i < no_of_player; i++){
        // console.log(cells[1]);
        player = new Player(1, random_color());
        player.draw();
        players.push(player);
    }
}

function is_game_over(){
    flag = false;
    for(let i = 0; i < players.length; i++){
        if(players[i].cell == cell_in_a_row * cell_in_a_coloum) flag = true;
    }
    return flag;
}

function random_color(){
    return color(random(255), random(255), random(255));
}


// function play(){
//     while(!is_game_over()){
//         for(let i = 0; i < no_of_player; i++){

//         }
//     }
// }

function play(){
    draw_board();
    draw_snakes(max_snakes);
    draw_ladders(max_ladders);
    if(!is_game_over()){
        for(let i = 0; i < no_of_player; i++){
            players[i].move(parseInt(random(1,6)));
            players[i].draw();
        }
    }else game_finished();
}

function draw(){
    if(frameCount % 5 == 0){
        play();
    }
}

function who_won(){
    for(let i = 0; i < players.length; i++){
        if(players[i].cell == cell_in_a_coloum * cell_in_a_row) return i + 1;
    }
}

function game_finished(){
    noLoop();
    console.log('game Finished');
    fill(255,255,255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text(`Player ${who_won()} won`, width / 2, height / 2);
}