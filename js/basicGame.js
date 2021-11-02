let T = 0
let radios = 63
let oldTimestamp = 0
let secondsPassed = 0
const animationSpeed = 40
let angle = 0
let X0 = window.innerWidth 
let Y0 = window.innerHeight
let y = Y0
let x = X0
let speed = 0
let hipo = 0
let timeElapsed = 0
const g = 0.3




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
		console.log('funciono')
		this.setContext()
		this.setDimensions()
		this.createBackground()
		this.createBasket()
		this.shooterLogic = new Shooter(this.canvasDOM, this.shoot)
		this.drawElements()
		this.start()
	},




	setContext() {
		this.canvasDOM = document.querySelector('#myCanvas')
		this.ctx = this.canvasDOM.getContext('2d')
	},




	setDimensions() {
		this.canvasSize.width = window.innerWidth
		this.canvasSize.height = window.innerHeight

		this.canvasDOM.setAttribute('width', this.canvasSize.width)
		this.canvasDOM.setAttribute('height', this.canvasSize.height)
	},




	start() {
		this.intervalId = setInterval(() => {
			this.framesCounter++
			this.clearScreen()
			this.drawElements()
			console.log('T is :', T)
			if (T !== 0) {
				this.update()
			}
		}, 1000 / this.FPS)
		this.framesCounter > 50 ? clearInterval(this.intervalId) : null
	},




	update() {
		console.log('Updating ...')
		T += 1
		console.log('speed:', speed)
		console.log('angle :', angle)

		if (angle < 40) {
			angle = angle +20
		}

		x = speed * Math.cos((-angle * Math.PI) / 180) * T + X0
		y = 0.5 * g * T ** 2 + 3 * speed * Math.sin((-angle * Math.PI) / 180) * T + Y0
		//radios = radios * 0.994
		if (radios > 35) {
			radios = radios * 0.991
		}
		
		console.log('printing Circle cordination : ', x, y)
	},



	shoot(res) {
		console.log('Shooted')
		T++
		hipo = res.hipo
		timeElapsed = res.timeElapsed
		angle = res.angle
		speed = hipo / timeElapsed
		console.log(
			'result from shooter shootEvent in shoot() and asigne in global variable :',
			hipo,
			angle,
			timeElapsed
		)
	},



	clearScreen() {
		this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
	},




	gameOver() {
		clearInterval(this.intervalId)
	},




	drawElements() {
		this.createBackground()
		this.createBasket()
		this.drawBallTest()
		//this.createBall()
		this.createPlayer()
		this.createBallStand()
	},



	drawBallTest() {
		// console.log('Drawing ...X,y', x, y)
		this.circleImg = new Image();
		this.circleImg.src = '../IMAGES/basketball_game_ball.png'
		this.ctx.drawImage(this.circleImg, x/2.15, y/3, x/13.5, x/13.5 )
		
		
		
		/* this.ctx.globalCompositeOperation='destination-in';
		this.ctx.beginPath()
		this.ctx.arc(x, y, radios, 0, 2 * Math.PI)
		this.ctx.fill() */
		
	},



	createBackground() {
		this.background = new Background(
			this.ctx,
			0,
			0,
			this.canvasSize.width,
			this.canvasSize.height
		)
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
		this.player.draw()
	},




	createBall() {
		/* this.ball = new Ball(this.ctx, 780, 320, this.canvasSize.width/13.54, this.canvasSize.height/7.62); */
		this.ball = new Ball(
			this.ctx,
			this.canvasSize.width / 2.14,
			this.canvasSize.height / 3,
			this.canvasSize.width / 13.54,
			this.canvasSize.height / 7.62
		)
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
		this.ballStand.draw()
	},
}
