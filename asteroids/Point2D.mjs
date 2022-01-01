export class Point2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    rotate(x, y, angle) {
        var rad = angle * Math.PI/180;
        var s = Math.sin(rad);
        var c = Math.cos(rad);

        // translate point back to origin:
        this.x -= x;
        this.y -= y;

        // rotate point
        var xnew = this.x * c - this.y * s;
        var ynew = this.x * s + this.y * c;

        // translate point back:
        this.x = xnew + x;
        this.y = ynew + y;

        return this
    }
}