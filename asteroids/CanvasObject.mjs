export class CanvasObject {
    constructor(x, y, width, height, angle) {
        this._x = x
        this._y = y
        this._width = width
        this._height = height
        this.angle = angle
        this.center = {
            x: x+width/2,
            y: y+height/2
        }
    }

    get x() {
        return this._x
    }
    set x(x) {
        this._x = x
        this.center.x = x+this.width/2
    }

    get y() {
        return this._y
    }
    set y(y) {
        this._y = y
        this.center.y = y+this.height/2
    }

    get width() {
        return this._width
    }
    set width(width) {
        this._width = width
        this.center.x = this.x+this.width/2
    }

    get height() {
        return this._height
    }
    set height(height) {
        this._height = height
        this.center.y = this.y+this.height/2
    }

    /**
     * Method which will draw the object in canvas
     * Thi method should be overridden by the subclass
     */
    draw(ctx) {}
}
