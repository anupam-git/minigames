import { Point2D } from "./Point2D.mjs"

export class CanvasObject {
    constructor(pos, width, height, angle) {
        this.pos = pos
        this.width = width
        this.height = height
        this.angle = angle
    }

    get center() {
        return new Point2D(this.pos.x + this.width/2, this.pos.y + this.height/2)
    }

    /**
     * Method which will draw the object in canvas
     * Thi method should be overridden by the subclass
     */
    draw(ctx) {}
}
