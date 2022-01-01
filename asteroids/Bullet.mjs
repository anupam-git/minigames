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

import { CanvasObject } from "./CanvasObject.mjs"

export class Bullet extends CanvasObject {
    constructor(pos, angle) {
        super(pos, 2, 2, angle)

        this.pos = pos
        this.angle = angle
        this.dPos = 4
        this.isOutOfView = false
    }

    draw(ctx) {
        super.draw(ctx)
        
        this.pos.x += Math.cos(this.angle * Math.PI/180) * this.dPos
        this.pos.y += Math.sin(this.angle * Math.PI/180) * this.dPos

        var p0 = this.pos.fromDelta(0, 0).rotate(this.center, this.angle)
        var p1 = this.pos.fromDelta(this.width, 0).rotate(this.center, this.angle)
        var p2 = this.pos.fromDelta(this.width, this.height).rotate(this.center, this.angle)
        var p3 = this.pos.fromDelta(-this.width, this.height).rotate(this.center, this.angle)
        
        ctx.fillStyle = 'white';
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.lineTo(p3.x, p3.y)
        ctx.fill()

        this.isOutOfView = !(this.pos.x >= 0 && this.pos.x <= ctx.canvas.width && this.pos.y >= 0 && this.pos.y <= ctx.canvas.height)
    }
}