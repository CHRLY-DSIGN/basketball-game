const basicGame = {
	ctx: undefined,
	canvasDOM: undefined,
	canvasSize: { width: undefined, height: undefined },
	duck: undefined,
	FPS: 60,
	framesCounter: 0,
	points: 0,
	player: undefined,
	shooterLogic: undefined,
	isGonnaCollide: false,
	collided: false,

	init() {
		this.setContext()
		this.setDimensions()
		this.createBall()
		this.createElements()
		this.drawElements()
		this.start()
	},

	setContext() {
		this.canvasDOM = document.querySelector('#myCanvas')
		this.ctx = this.canvasDOM.getContext('2d')
	},

	setDimensions() {
		this.canvasSize.width = 1664
		this.canvasSize.height = 936
		this.canvasDOM.setAttribute('width', this.canvasSize.width)
		this.canvasDOM.setAttribute('height', this.canvasSize.height)
		this.setBallDimensions()
	},

	start() {
		this.intervalId = setInterval(() => {
			this.framesCounter++
			this.clearScreen()
			this.drawElements()

			if (this.ball.isShooted) {
				if (!this.collided) {
					this.ball.update()
				} else {
					this.assigneIsGonnaCollide()
				}
				this.drawBall()
			}

			this.drawPlayer()
			this.drawBallStand()
			/* if (T !== 0) {
				this.update()
			} */

			if (this.isCollisionBoard()) {
				console.log('collision board')
			}

			if (this.isCollisionBasketLeft()) {
				console.log('collision basket left')
			}

			if (this.isCollisionBasketRight()) {
				console.log('collision basket right')
			}

			if (this.isCollisionFloor()) {
				this.collided = true

				console.log('collision floor')
			}
		}, 1000 / this.FPS)
		this.framesCounter > 50 ? clearInterval(this.intervalId) : null
	},

	clearScreen() {
		this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
	},

	gameOver() {
		clearInterval(this.intervalId)
	},

	createElements() {
		this.createBackground()
		this.createBasket()
		this.createBall()
		//this.drawBallTest()
		this.createPlayer()
		this.createBallStand()
		this.createCollisionBoard()
		this.createCollisionBasketLeft()
		this.createCollisionBasketRight()
		this.createCollisionFloor()
	},

	drawElements() {
		this.drawBackground()
		this.drawBasket()
		this.drawBall()
		//this.drawBallTest()
		this.drawPlayer()
		this.drawBallStand()
		this.drawCollisionBoard()
		this.drawCollisionBasketLeft()
		this.drawCollisionBasketRight()
		this.drawCollisionFloor()
	},

	createBackground() {
		this.background = new Background(
			this.ctx,
			0,
			0,
			this.canvasSize.width,
			this.canvasSize.height
		)
	},

	drawBackground() {
		this.background.draw()
	},

	createBasket() {
		this.basket = new BasketStandar(
			this.ctx,
			0,
			0,
			this.canvasSize.width,
			this.canvasSize.height
		)
	},

	drawBasket() {
		this.basket.draw()
	},

	createPlayer() {
		this.player = new Player(
			this.ctx,
			0,
			0,
			this.canvasSize.width,
			this.canvasSize.height
		)
	},

	drawPlayer() {
		this.player.draw()
	},

	setBallDimensions() {
		this.ballInitialX = this.canvasSize.width / 2.14
		this.ballInitialY = this.canvasSize.height / 3
		this.ballInitialWidth = this.canvasSize.width / 13.54
		this.ballInitialHeight = this.canvasSize.height / 7.62
	},

	createBall() {
		this.ball = new Ball(
			this.canvasDOM,
			this.ctx,
			this.ballInitialX,
			this.ballInitialY,
			this.ballInitialWidth,
			this.ballInitialHeight
		)
	},

	drawBall() {
		this.ball.draw()
		this.assigneIsGonnaCollide()
	},

	createBallStand() {
		this.ballStand = new BallStand(
			this.ctx,
			0,
			0,
			this.canvasSize.width,
			this.canvasSize.height
		)
	},

	drawBallStand() {
		this.ballStand.draw()
	},

	createCollisionBoard() {
		this.collisionBoard = new CollisionBoard(this.ctx, 1103, 135, 12, 150)
	},

	drawCollisionBoard() {
		this.collisionBoard.draw()
	},

	isCollisionBoard() {
		return (
			this.ball.pos.x - 30 + this.ball.size.width > this.collisionBoard.pos.x && //lado drch del ball lado izq del this.collisionBoard
			this.ball.pos.x <
				this.collisionBoard.pos.x + this.collisionBoard.size.width && //lado izq del ball lado drch del this.collisionBoard
			this.ball.pos.y + this.ball.size.height > this.collisionBoard.pos.y //lado de abajo del ball lado de arriba del this.collisionBoard
		)
	},

	createCollisionBasketLeft() {
		this.collisionBasketLeft = new CollisionBasketLeft(
			this.ctx,
			980,
			260,
			12,
			12
		)
	},

	drawCollisionBasketLeft() {
		this.collisionBasketLeft.draw()
	},

	isCollisionBasketLeft() {
		return (
			this.ball.pos.x + this.ball.size.width > this.collisionBasketLeft.pos.x && //lado drch del ball lado izq del this.collisionBasketLeft
			this.ball.pos.x <
				this.collisionBasketLeft.pos.x + this.collisionBasketLeft.size.width && //lado izq del ball lado drch del this.collisionBasketLeft
			this.ball.pos.y + this.ball.size.height >
				this.collisionBasketLeft.pos.y && //lado de abajo del ball lado de arriba del this.collisionBasketLeft
			this.ball.pos.y <
				this.collisionBasketLeft.pos.y + this.collisionBasketLeft.size.height
		)
	},

	createCollisionBasketRight() {
		this.collisionBasketRight = new CollisionBasketRight(
			this.ctx,
			1080,
			260,
			12,
			12
		)
	},

	drawCollisionBasketRight() {
		this.collisionBasketRight.draw()
	},

	isCollisionBasketRight() {
		return (
			this.ball.pos.x + this.ball.size.width >
				this.collisionBasketRight.pos.x && //lado drch del ball lado izq del this.collisionBasketRight
			this.ball.pos.x <
				this.collisionBasketRight.pos.x +
					this.collisionBasketRight.size.width && //lado izq del ball lado drch del this.collisionBasketRight
			this.ball.pos.y + this.ball.size.height >
				this.collisionBasketRight.pos.y && //lado de abajo del ball lado de arriba del this.collisionBasketRight
			this.ball.pos.y <
				this.collisionBasketRight.pos.y + this.collisionBasketRight.size.height
		)
	},

	createCollisionFloor() {
		this.collisionFloor = new CollisionFloor(this.ctx, 0, 615, 1664, 12)
	},

	drawCollisionFloor() {
		this.collisionFloor.draw()
	},

	isCollisionFloor() {
		return (
			this.ball.pos.y + this.ball.size.height > this.collisionFloor.pos.y //lado de abajo del ball lado de arriba del this.collisionFloor
		)
	},

	assigneIsGonnaCollide() {
		if (this.ball.radios < 90) {
			this.isGonnaCollide = true
		} else {
			this.isGonnaCollide = false
		}
	},

	animateCollisionFloor() {
		/* this.ball.pos.y =
			0.5 * this.ball.g * this.ball.T ** 2 +
			3 * this.ball.speed * Math.sin((-this.ball.angle * Math.PI) / 180) * this.ball.T +
			this.ball.pos.initialY */

		console.log('animacion parado--------------------------------')
	},
}
