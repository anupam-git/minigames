import { CanvasObject } from "CanvasObject.mjs"
import { Point2D } from "./Point2D.mjs"

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

        this.angle += this.dx
        this.y += this.dy

        var p0 = new Point2D(this.x+this.width/2, this.y).rotate(this.center.x, this.center.y, this.angle)
        var p1 = new Point2D(this.x+this.width, this.y+this.height).rotate(this.center.x, this.center.y, this.angle)
        var p2 = new Point2D(this.x+this.width/2, this.y+this.height-5).rotate(this.center.x, this.center.y, this.angle)
        var p3 = new Point2D(this.x, this.y+this.height).rotate(this.center.x, this.center.y, this.angle)
        
        ctx.beginPath()
        ctx.fillStyle = 'white';
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.lineTo(p3.x, p3.y)
        ctx.fill()

        // Debug points
        /*
        ctx.fillStyle = "red"
        ctx.fillRect(p0.x-3, p0.y-3, 6, 6)
        ctx.fillRect(p1.x-3, p1.y-3, 6, 6)
        ctx.fillRect(p2.x-3, p2.y-3, 6, 6)
        ctx.fillRect(p3.x-3, p3.y-3, 6, 6)
        ctx.fillStyle = "blue"
        ctx.fillRect(this.center.x-3, this.center.y-3, 6, 6)
        */
        //////
    }

    startMoveUp() {
        this.dy = -this.maxDy
    }
    startMoveDown() {
        this.dy = this.maxDy
    }

    startRotateLeft() {
        this.dx = -this.maxDx
    }
    startRotateRight() {
        this.dx = this.maxDx
    }

    stopMoveUp() {
        this.dy = 0
    }
    stopMoveDown() {
        this.dy = 0
    }

    stopRotateLeft() {
        this.dx = 0
    }
    stopRotateRight() {
        this.dx = 0
    }
}
