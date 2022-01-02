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
    constructor(pos, speed, angle, small=false) {
        super(pos, small ? 25 : 50, small ? 25 : 50, angle)

        this.scoreValue = small ? 15 : 10
        this.speed = speed
        this.isOutOfView = false
        this.spriteAngle = 0
        this.spriteRotationSpeed = 1+(1/getRandomIntInclusive(1, 10))
        this.small = small
    }

    draw(ctx) {
        super.draw(ctx)
        
        this.pos.x += Math.cos(this.angle * Math.PI/180) * this.speed
        this.pos.y += Math.sin(this.angle * Math.PI/180) * this.speed
        this.spriteAngle += this.spriteRotationSpeed

        // Image drawing with rotation reference : https://stackoverflow.com/a/43155027
        ctx.setTransform(1, 0, 0, 1, this.center.x, this.center.y);
        ctx.rotate(this.spriteAngle*Math.PI/180);
        ctx.drawImage("assets/sprites/asteroid.png", -this.width/2, -this.height/2, this.width, this.height);
        ctx.setTransform(1,0,0,1,0,0);

        this.isOutOfView = !(
            this.pos.x >= -this.width-200 &&
            this.pos.x <= ctx.canvas.width+this.width+200 &&
            
            this.pos.y >= -this.height-200 &&
            this.pos.y <= ctx.canvas.height+this.height+200
        )
    }

    toString() {
        return `Asteroid(pos: ${this.pos}, angle: ${this.angle}, width: ${this.width}, height: ${this.height})`
    }
}