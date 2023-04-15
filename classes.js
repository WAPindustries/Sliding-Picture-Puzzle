class Game{
    
    constructor({
        image, 
        width, height,
        pieces_width, pieces_height,
    }){
        for (var arg in arguments[0]) this[arg] = arguments[0][arg]
        this.image = Game.Get_Image(this.image)
        this.blocks = []
        this.scale = {x: Math.floor(width/pieces_width), y: Math.floor(height/pieces_height)}
	  this.end = false

	  setTimeout(()=>{
		this.crop = {
            	x: this.image.width/this.pieces_width,
            	y: this.image.height/this.pieces_height
        	}
	  }, 1)
    }
    
    Init(){
        var canvas = document.createElement("canvas")
        canvas.style = "position: absolute; margin: auto; border: 2px solid white; top: 0; bottom:0; left:0; right:0;"
        
        canvas.style.background = "black"
        canvas.style.width = canvas.width = this.width
        canvas.style.height = canvas.height = this.height
        
        
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        document.body.appendChild(canvas)
        
        this.Create_Pieces()
	  this.Scramble()
    }
    
    
    Create_Pieces(){
            
        for (var i in [...Array(this.pieces_height)]){
            for (var j in [...Array(this.pieces_width)]){
                i = +i; j=+j
                
                this.blocks.push(
                    new Block({
                        width: this.scale.x, 
                        height: this.scale.y,
                        index: i*this.pieces_width+j,
                        pos: {
                            real:{x: j, y: i},
                            con:{x: j, y: i}
                        },
                    })
                )
            }
        }  
	  this.saved_block = this.blocks[this.blocks.length-1] 
        this.blocks.pop()
    }
    
    Render_Board(){
        
        for (var block of this.blocks){
            
            this.context.drawImage(
                this.image,
                this.crop.x*block.pos.con.x, this.crop.y*block.pos.con.y,
                this.crop.x, this.crop.y,
                block.pos.real.x*block.width, block.pos.real.y*block.height,
                block.width, block.height
            )
            
            this.context.strokeStyle = "white", this.context.lineWidth = 3
            this.context.strokeRect(
                block.pos.real.x*block.width, block.pos.real.y*block.height,
                block.width, block.height
            )
        }
        
    }

    Scramble(){

	  var dirs = ["up", "down", "left", "right"]
	  
	  for (var i in [...Array(Math.floor(Math.random()*100))]) Move_Block(dirs[Math.floor(Math.random()*dirs.length)], true)

    }
    
    
    static Get_Image(src){
        var img = new Image(); img.src= src
        return img
    }    
}



class Block{
        
    constructor({
        width, height,
        index,
        pos
    }){
       for (var arg in arguments[0]) this[arg] = arguments[0][arg]
    }
    
}