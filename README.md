# Sliding-Picture-Puzzle
  
  
## Customisation
```js

// inside main.html

window.onload = ()=>{

      game = new Game({
          image: "bingchilling.png",  // puzzle image
          width: 600,  // canvas width
          height: 500,  // canvas height 
          pieces_width: 3,  // number of pieces along width of canvas 
          pieces_height: 3,  // number of pieces along height of canvas
      })

      game.Init()   

      setTimeout(main,100)
  }

```
