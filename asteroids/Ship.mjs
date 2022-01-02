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

import { Rectangle } from "./Rectangle.mjs"
import { Triangle } from "./Triangle.mjs"

export class Ship extends Rectangle {
    constructor(pos, angle) {
        if (pos == null || angle == null) {
            throw "Parameters cannot be undefined"
        }

        super(pos, 30, 45, angle)

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

        // Image drawing with rotation reference : https://stackoverflow.com/a/43155027
        ctx.setTransform(1, 0, 0, 1, this.center.x, this.center.y);
        ctx.rotate(this.angle*Math.PI/180);
        ctx.shadowOffsetX = 6
        ctx.shadowOffsetY = 6
        ctx.shadowColor = "black";
        ctx.shadowBlur = 6;
        ctx.drawImage("assets/sprites/spaceship.png", -this.width/2, -this.height/2, this.width, this.height);
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.setTransform(1,0,0,1,0,0);
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
