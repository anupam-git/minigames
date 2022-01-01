import { CanvasObject } from "CanvasObject.mjs"
import { Point2D } from "./Point2D.mjs"

export class Ship extends CanvasObject {
    constructor(pos, angle) {
        if (pos == null || angle == null) {
            throw "Parameters cannot be undefined"
        }

        super(pos, 20, 30, angle)

        this.maxDAngle = 4
        this.maxDPos = 4
        this.dAngle = 0
        this.dPos = 0
    }

    draw(ctx) {
        super.draw(ctx)

        this.angle += this.dAngle
        this.pos.x += Math.cos(this.angle * Math.PI/180) * this.dPos
        this.pos.y += Math.sin(this.angle * Math.PI/180) * this.dPos

        if (this.angle < 0) {
            this.angle = 360 + this.angle
        } else if (this.angle >= 360) {
            this.angle -= 360
        }

        var p0 = this.pos.fromDelta(this.width/2, 0).rotate(this.center, this.angle-90)
        var p1 = this.pos.fromDelta(this.width, this.height).rotate(this.center, this.angle-90)
        var p2 = this.pos.fromDelta(this.width/2, this.height-5).rotate(this.center, this.angle-90)
        var p3 = this.pos.fromDelta(0, this.height).rotate(this.center, this.angle-90)
        
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
        this.dPos = -this.maxDPos
    }
    startMoveDown() {
        this.dPos = this.maxDPos
    }

    startRotateLeft() {
        this.dAngle = -this.maxDAngle
    }
    startRotateRight() {
        this.dAngle = this.maxDAngle
    }

    stopMoveUp() {
        this.dPos = 0
    }
    stopMoveDown() {
        this.dPos = 0
    }

    stopRotateLeft() {
        this.dAngle = 0
    }
    stopRotateRight() {
        this.dAngle = 0
    }
}
