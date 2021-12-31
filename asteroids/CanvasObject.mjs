export class CanvasObject {
    constructor(x, y, angle) {
        this.x = x
        this.y = y
        this.angle = angle
    }

    /**
     * Method which will draw the object in canvas
     * Thi method should be overridden by the subclass
     */
    draw(ctx) {}
}
