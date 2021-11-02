/* let T = 0
let oldTimestamp = 0
let secondsPassed = 0
const animationSpeed = 40
let angle = 0
let X0 = window.innerWidth
let Y0 = window.innerHeight
let y = Y0/3
let x = X0/2.15
const initialBallSize = X0 / 13.5
let radios = initialBallSize
let speed = 0
let hipo = 0
let timeElapsed = 0
const g = 0.3 */

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

	init() {
		//console.log('funciono')
		this.setContext()
		this.setDimensions()
		this.createBall()
		//this.shooterLogic = new Shooter(this.canvasDOM, this.shoot)
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
				this.ball.update()
				this.drawBall()
			}

			this.drawPlayer()
			this.drawBallStand()
			/* if (T !== 0) {
				this.update()
			}
			if (this.isCollisionBoard()) {
				console.log("collision")
			}; */
		}, 1000 / this.FPS)
		this.framesCounter > 50 ? clearInterval(this.intervalId) : null
	},

	/* update() {
		T += 1
		if (angle < 40) {
			angle = angle + 20
		}

		x = (speed * Math.cos((-angle * Math.PI) / 180) * T + X0)
		y =
			0.5 * g * T ** 2 + 3 * speed * Math.sin((-angle * Math.PI) / 180) * T + Y0
		let variator = 1
		let deltaX = x - X0
		variator = variator + deltaX / 500
		if (variator <= 2) {
			radios = initialBallSize / variator
		}
	}, */

	/* shoot(res) {
		T++
		hipo = res.hipo
		timeElapsed = res.timeElapsed
		angle = res.angle
		speed = hipo / timeElapsed
	}, */

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
	},
	drawElements() {
		this.drawBackground()
		this.drawBasket()
		this.drawBall()
		//this.drawBallTest()
		this.drawPlayer()
		this.drawBallStand()
		//this.createCollisionBoard();
	},

	/* drawBallTest() {

		this.circleImg = new Image()
		this.circleImg.src = '../IMAGES/basketball_game_ball.png'
		this.ctx.drawImage(this.circleImg, x, y, radios, radios)
		this.circleImg.x = x;
		this.circleImg.y = y;
		this.circleImg.radios = radios;
	}, */

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
		//console.log("ball coordination", this.ball.pos.x, this.ball.pos.y);
		this.ball.draw()
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
	createDrawCollisionBoard() {
		this.collisionBoard = new CollisionBoard(
			this.ctx,
			this.canvasSize.width / 2 + 274,
			this.canvasSize.height / 2 - 680 / 2,
			14,
			160
		)
		this.collisionBoard.draw()
	},

	isCollisionBoard() {
		return (
			x + radios > this.collisionBoard.pos.x && //lado drch del circleImg lado izq del this.collisionBoard
			x < this.collisionBoard.pos.x + this.collisionBoard.size.width && //lado izq del circleImg lado drch del this.collisionBoard
			y + radios > this.collisionBoard.pos.y && //lado de abajo del circleImg lado de arriba del this.collisionBoard
			y < this.collisionBoard.pos.y + this.collisionBoard.size.height //lado de arriba del circleImg lado de abajo del this.collisionBoard
		)
	},
}
