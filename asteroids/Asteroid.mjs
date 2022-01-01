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
import { getRandomIntInclusive } from "./Util.mjs"
import { Point2D } from "./Point2D.mjs"

export class Asteroid extends Rectangle {
    constructor(pos, speed, angle) {
        super(pos, 50, 50, angle)

        this.speed = speed
        this.isOutOfView = false
        this.spriteAngle = 0
        this.spriteRotationSpeed = 1+(1/getRandomIntInclusive(1, 10))
    }

    draw(ctx) {
        super.draw(ctx)
        
        this.pos.x += Math.cos(this.angle * Math.PI/180) * this.speed
        this.pos.y += Math.sin(this.angle * Math.PI/180) * this.speed
        this.spriteAngle += this.spriteRotationSpeed

        var points = this.getPoints()

        ctx.beginPath()
        ctx.fillStyle = 'red';
        
        for (var i in points) {
            points[i] = new Point2D(points[i].x, points[i].y).rotate(this.center, this.spriteAngle)

            if (i==0) {
                ctx.moveTo(points[i].x, points[i].y)
            }
            ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.fill()

        this.isOutOfView = !(
            this.pos.x >= -this.width-200 &&
            this.pos.x <= ctx.canvas.width+this.width+200 &&
            
            this.pos.y >= -this.height-200 &&
            this.pos.y <= ctx.canvas.height+this.height+200
        )
    }
}