const basicGame = {
    ctx : undefined,
    canvasDOM: undefined,
    canvasSize : { width: undefined, height: undefined }, 
    duck : undefined,
    FPS : 60,
    framesCounter: 0,
    points: 0,
    player: undefined,
    

    startGame() {
        console.log("funcino");
        this.setContext();
        this.setDimensions();
        this.createBackground();
        this.createBasket();
        this.drawElements();
        this.start();
    },


    setContext() {
        this.canvasDOM = document.querySelector("#myCanvas");
        this.ctx = this.canvasDOM.getContext("2d");
    },


    setDimensions() {
        this.canvasSize.width = window.innerWidth;
        this.canvasSize.height = window.innerHeight;
    
        this.canvasDOM.setAttribute("width", this.canvasSize.width);
        this.canvasDOM.setAttribute("height", this.canvasSize.height);
    },


    start() {

        this.intervalId = setInterval(() => {
            this.framesCounter++;

            if (this.framesCounter > 2000) {
                this.framesCounter = 0
            }


            this.clearScreen();
            this.drawElements();

        }, 1000/ this.FPS);

    },


    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    },


    gameOver() {
        clearInterval(this.intervalId)
    },


    drawElements() {
        this.createBackground();
        this.createBasket();
        this.createBall();
        this.createPlayer();
        this.createBallStand();
    },
    
    
    createBackground() {
        this.background = new Background(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height);
        this.background.draw();
    },


    createBasket() {
        this.basket = new BasketStandar(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height);
        this.basket.draw();
    },


    createPlayer() {
        this.player = new Player(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height);
        this.player.draw();
    },


    createBall() {
        /* this.ball = new Ball(this.ctx, 780, 320, this.canvasSize.width/13.54, this.canvasSize.height/7.62); */
        this.ball = new Ball(this.ctx, this.canvasSize.width/2.14, this.canvasSize.height/3, this.canvasSize.width/13.54, this.canvasSize.height/7.62);
        this.ball.draw();
    },


    createBallStand() {
        this.ballStand = new BallStand(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height);
        this.ballStand.draw();
    }
}
