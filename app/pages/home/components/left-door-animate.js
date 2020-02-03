// 提供车前门动画

class LeftDoorAnimate {
	constructor(obj) {
		this.active = false
		this.data = [
			{x: 7, z: -7, angle: -.1},
			{x: 27, z: -16, angle: -.2},
			{x: 62, z: -36, angle: -.3},
			{x: 142, z: -22, angle: -.7}
		]
		this.obj = obj
		this.index = 0
		this.timer = null
	}

	move(func) {
		if (!this.active) return
		const data = this.data[this.index]
		this.index += 1
		const {x, z, angle} = data
		this.obj.position.set(x, 0, z)
		this.obj.rotateY(angle)
		if (this.index === 4) {
			this.active = false
			this.index = 0
			clearInterval(this.timer)
			func()
			this.reset()
		}
	}

	play(func) {
		this.active = true
		this.timer = setInterval(() => this.move(func), 50)
	}
	// 复位
	reset(){
		this.obj.position.set(0, 0, 0)
		this.obj.rotateY(1.29999)
	}
}

export {LeftDoorAnimate}
