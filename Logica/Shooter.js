class Shooter {
	/**
	 *
	 * @param {EventTarget} htmlElm The HTML elemnt to apply the event
	 * @param {Function} callback  The function to run once the target is Clicked and draged and droped.
	 */
	constructor(htmlElm, callback) {
		this.target = htmlElm

		this.callback = callback
		this.isHeld = false
		this.isDroped = false
		this.timeElapsed = 0
		this.timerId = undefined
		this.posStart = undefined
		this.posEnd = undefined
	}
	_onHold(e) {
		this.isHeld = true
		console.log('onHold  e cordinate : ', e.x, e.y)
		this.posStart = { x: e.x, y: e.y }
		this.timerId = setInterval(() => {
			this.timeElapsed++
		}, 1)
	}
	_OnDrop(e) {
		this.isHeld = false
		this.isDroped = true
		clearInterval(this.timerId)
		console.log('OnDrop timeElapesed', this.timeElapsed)
		console.log('onDrop  e cordinate : ', e.x, e.y)
		this.posEnd = { x: e.x, y: e.y }
		let deltaY = this.posStart.y - this.posEnd.y
		let deltaX = this.posEnd.x - this.posStart.x
		let hipo = Math.sqrt(deltaX ** 2 + deltaY ** 2)
		let angle = (Math.asin(deltaY / hipo) * 180) / Math.PI

		this.callback({ hipo, angle, timeElapsed: this.timeElapsed })
    this.timeElapsed =0;
	}
	addListeners() {
		this.target.addEventListener('pointerdown', (e) => {
			this._onHold(e)
		})
		this.target.addEventListener('pointerup', (e) => {
			this._OnDrop(e)
		})
	}
}