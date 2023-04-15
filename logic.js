function Move_Block(dir, scrambling=false){
    var funcs = {
        "up": ["x", 0, -1],
        "down": ["x", 0, 1],
        "right": ["x", 1, 0],
        "left": ["x", -1, 0],
    }
    
    var block = Get_First(...funcs[dir])
    if (block==undefined) return
    block.pos.real = {x: block.pos.real.x+funcs[dir][1], y: block.pos.real.y+funcs[dir][2]}

    if (!scrambling) Check_Win()
}

function Check_Win(){
    for (var block of game.blocks){
        if (block.pos.real.y*game.pieces_width+block.pos.real.x!=block.index) return
    }
	
    game.blocks.push(game.saved_block)
    setTimeout(()=>{
	  game.ended = true
	  alert("Puzzle Solved!")
    }, 100)
}

function Get_First(coord, check_x, check_y){
    for (var i in [...Array(game.pieces_height)]){
        for (var j in [...Array(game.pieces_width)]){
		var index = +i *game.pieces_width+ +j
	    	if (index==game.blocks.length) return 	
		var block = game.blocks[index]
		if (Check_Empty(block, check_x, check_y)) return block	
    	  }
    }
}

function Check_Empty(block, x, y){
    var pos = {x: block.pos.real.x+x, y: block.pos.real.y+y}
	
	if (
	  (block.pos.real.x==0 && x==-1) ||
	  (block.pos.real.x==game.pieces_width-1 && x==1) ||
	  (block.pos.real.y==0 && y==-1) ||
	  (block.pos.real.y==game.pieces_height-1 && y==1)
	) return false

    for (var _block of game.blocks){
        if (_block.pos.real.x==pos.x && _block.pos.real.y==pos.y) return false
    }
    return true
}

window.addEventListener("keyup", (e)=>{
    if (e.key.includes("Arrow")) Move_Block(e.key.replace("Arrow", "").toLowerCase())
})