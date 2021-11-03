class Ball {
	constructor(canvasDOM, ctx, posX, posY, radios = 123.26) {
		this.ctx = ctx

		this.canvasDOM = canvasDOM

		this.pos = {
			x: posX,
			y: posY,
			initialX: 777.57,
			initialY: 312,
		}

		this.size = {
			width: radios,
			height: radios,
		}

		this.image = undefined

		this.T = 0

		this.oldTimestamp = 0

		this.secondsPassed = 0

		this.isShooted = false
		this.radios = radios
		this.initialBallSize = 123.26

		this.isEventAdded = false

		this.angle = undefined

		this.speed = undefined

		this.g = 0.3

		this.shooterLogic = new Shooter(this.canvasDOM, this.shoot.bind(this))

		this.visible = true
	

		this.startGame()
	}

	startGame() {
		this.image = new Image()
		this.image.src = '../IMAGES/basketball_game_ball.png'
	}

	draw() {

		if (this.visible) {
			this.ctx.drawImage(
				this.image,
				this.pos.x,
				this.pos.y,
				this.radios,
				this.radios
			)
		}
		
	}

	shoot(res) {
		console.log(res)
		this.isShooted = true
		this.T++
		this.hipo = res.hipo
		this.angle = res.angle
		let timeElapsed = res.timeElapsed
		this.speed = this.hipo / timeElapsed

		this.update()
		//console.log("shoooteado", this.angle, this.speed);
	}

	update() {
		console.log('Updating..')
		this.T += 1

		if (this.angle < 40) {
			this.angle = this.angle + 20
		}

		this.pos.x =
			this.speed * Math.cos((-this.angle * Math.PI) / 180) * this.T +
			this.pos.initialX
		this.pos.y =
			0.5 * this.g * this.T ** 2 +
			3 * this.speed * Math.sin((-this.angle * Math.PI) / 180) * this.T +
			this.pos.initialY

		let modifier = 1
		let deltaX = this.pos.x - this.pos.initialX

		modifier = modifier + deltaX / 500

		if (modifier <= 2) {
			this.radios = this.initialBallSize / modifier
		}
	}


	move(speed, angle, initialX, initialY) {

		this.T ++
	
		this.pos.x =
			speed * Math.cos((-angle * Math.PI) / 180) * this.T +
			initialX
		this.pos.y =
			0.5 * this.g * this.T ** 2 +
			3 * speed * Math.sin((-angle * Math.PI) / 180) * this.T +
			initialY
	}

}
