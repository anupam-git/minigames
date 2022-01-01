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

import { Ship } from "Ship.mjs"
import { Asteroid } from "./Asteroid.mjs"
import { Bullet } from "./Bullet.mjs"
import * as CollisionDetector from "./CollisionDetector.mjs"
import { Point2D } from "./Point2D.mjs"

var fps = 0
var fpsStartTime = new Date().getTime()

var ship = null
var bullets = []
var asteroids = []

export function handleKeyPressed(event) {
    switch (event.key) {
        case Qt.Key_Left:
            ship.startRotateLeft()
            break;
        case Qt.Key_Right:
            ship.startRotateRight()
            break;
        case Qt.Key_Up:
            ship.startMoveUp()
            break;
        case Qt.Key_Down:
            ship.startMoveDown()
            break;
        case Qt.Key_Space:
            bullets.push(new Bullet(new Point2D(ship.center.x, ship.pos.y).rotate(ship.center, ship.angle), ship.angle-90))
            break;
    }
}

export function handleKeyReleased(event) {
    switch (event.key) {
        case Qt.Key_Left:
            ship.stopRotateLeft()
            break;
        case Qt.Key_Right:
            ship.stopRotateRight()
            break;
        case Qt.Key_Up:
            ship.stopMoveUp()
            break;
        case Qt.Key_Down:
            ship.stopMoveDown()
            break;
    }
}

export function generateAsteroid(x, y, speed, angle) {
    asteroids.push(new Asteroid(new Point2D(x, y), speed, angle))
}

export function loop(ctx, game, greinerHormann) {
    /**
     * Initialization
     */
    if (!ship) {
        ship = new Ship(new Point2D(ctx.canvas.width/2, ctx.canvas.height/2), 0)
        ship.pos.x -= ship.width/2
        ship.pos.y -= ship.height/2
    }
    /**************/

    /**
     * FPS Calculation
     */
    if (new Date().getTime()-fpsStartTime >= 1000) {
        game.fps = fps
        fps = 0
        fpsStartTime = new Date().getTime()
    }

    fps += 1
    /**************/

    /**
     * Draw all objects
     */
    ship.draw(ctx)
    for (var i in bullets) {
        bullets[i].draw(ctx)
    }
    for (var i in asteroids) {
        asteroids[i].draw(ctx)
    }
    /**************/

    /**
     * Collision Detection
     */
    for (var i in asteroids) {
        if (CollisionDetector.isColliding(greinerHormann, ship, asteroids[i])) {
            game.pause = true
            console.log("Asteroid Collided with ship. Game Over !!!")
        }
    }
    /**************/

    /**
     * Delete stray and out of view objects
     */
    for (var i in bullets) {
        if (bullets[i].isOutOfView) {
            bullets.splice(i, 1)
        }
    }
    for (var i in asteroids) {
        if (asteroids[i].isOutOfView) {
            asteroids.splice(i, 1)
        }
    }
    /**************/
}

export function reset() {
    ship = null
    bullets = []
    asteroids = []
}
