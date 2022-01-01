export class Point2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    rotate(pivot, angle) {
        var rad = angle * Math.PI/180;
        var s = Math.sin(rad);
        var c = Math.cos(rad);

        // translate point back to origin:
        this.x -= pivot.x;
        this.y -= pivot.y;

        // rotate point
        var xnew = this.x * c - this.y * s;
        var ynew = this.x * s + this.y * c;

        // translate point back:
        this.x = xnew + pivot.x;
        this.y = ynew + pivot.y;

        return this
    }

    fromDelta(dx, dy) {
        return new Point2D(this.x+dx, this.y+dy)
    }
}