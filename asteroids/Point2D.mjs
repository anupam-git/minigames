/*
 * MIT License
 *
 * Copyright (c) 2021 Anupam Basak <anupam.basak27@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export class Point2D {
    constructor(x, y) {
        this.x = parseInt(x)
        this.y = parseInt(y)
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
        this.x = parseInt(xnew + pivot.x);
        this.y = parseInt(ynew + pivot.y);

        return this
    }

    fromDelta(dx, dy) {
        return new Point2D(this.x+dx, this.y+dy)
    }

    copy() {
        return new Point2D(this.x, this.y)
    }

    toArray() {
        return [this.x, this.y]
    }
}