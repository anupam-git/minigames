import { CanvasObject } from "CanvasObject.mjs"

export class Ship extends CanvasObject {
    constructor(x, y, angle) {
        if (x == null || y == null || angle == null) {
            throw "Parameters cannot be undefined"
        }

        super(x, y, 20, 30, angle)

        this.maxDx = 4
        this.maxDy = 4
        this.dx = 0
        this.dy = 0
    }

    draw(ctx) {
        super.draw(ctx)

        this.x += this.dx
        this.y += this.dy

        ctx.beginPath()
        ctx.fillStyle = 'white';
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x+this.width/2, this.y+this.height)
        ctx.lineTo(this.x, this.y+this.height-5)
        ctx.lineTo(this.x-this.width/2, this.y+this.height)
        ctx.fill()
    }

    startMoveUp() {
        this.dy = -this.maxDy
    }
    startMoveDown() {
        this.dy = this.maxDy
    }
    startMoveLeft() {
        this.dx = -this.maxDx
    }
    startMoveRight() {
        this.dx = this.maxDx
    }

    stopMoveUp() {
        this.dy = 0
    }
    stopMoveDown() {
        this.dy = 0
    }
    stopMoveLeft() {
        this.dx = 0
    }
    stopMoveRight() {
        this.dx = 0
    }
}
