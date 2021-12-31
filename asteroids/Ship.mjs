import { CanvasObject } from "CanvasObject.mjs"

export class Ship extends CanvasObject {
    constructor(x, y, angle) {
        if (x == null || y == null || angle == null) {
            throw "Parameters cannot be undefined"
        }

        super(x, y, angle)
    }

    draw(ctx) {
        super.draw(ctx)

        ctx.beginPath()
        ctx.fillStyle = 'white';
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x+10, this.y+30)
        ctx.lineTo(this.x, this.y+25)
        ctx.lineTo(this.x-10, this.y+30)
        ctx.fill()
    }
}
