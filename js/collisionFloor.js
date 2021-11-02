class CollisionFloor {
    constructor(ctx, posX, posY, width, height) {
      this.ctx = ctx
  
      this.pos = {
        x: posX,
        y: posY
      }
  
      this.size = {
        width: width,
        height: height
      }
    }
  
    draw() {
      this.ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height)
      this.ctx.fillStyle = "red";
    }
  
  }