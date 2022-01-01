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

import { Triangle } from "./Triangle.mjs"

export class Ship extends Triangle {
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
        this.pos.x += Math.cos((this.angle+90) * Math.PI/180) * this.dPos
        this.pos.y += Math.sin((this.angle+90) * Math.PI/180) * this.dPos

        if (this.angle < 0) {
            this.angle = 360 + this.angle
        } else if (this.angle >= 360) {
            this.angle -= 360
        }

        var points = this.getPoints()
        
        ctx.beginPath()
        ctx.fillStyle = 'white';
        ctx.moveTo(points[0][0], points[0][1])
        for (var i in points) {
            ctx.lineTo(points[i][0], points[i][1])
        }
        ctx.fill()
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
