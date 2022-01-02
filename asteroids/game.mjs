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
import { getRandomIntInclusive } from "./Util.mjs"

var fps = 0
var fpsStartTime = new Date().getTime()

var ship = null
var bullets = []
var asteroids = []
var bgOffsetX = 0
var bgOffsetY = 0
var bgOffsetDx = 0
var bgOffsetDy = 0

export function handleKeyPressed(event, game) {
    switch (event.key) {
        case Qt.Key_Left:
            bgOffsetDx = 1
            ship.startRotateLeft()
            break;
        case Qt.Key_Right:
            bgOffsetDx = -1
            ship.startRotateRight()
            break;
        case Qt.Key_Up:
            bgOffsetDy = 1
            ship.startMoveUp()
            break;
        case Qt.Key_Down:
            bgOffsetDy = -1
            ship.startMoveDown()
            break;
        case Qt.Key_Space:
            bullets.push(new Bullet(new Point2D(ship.center.x, ship.pos.y).rotate(ship.center, ship.angle), ship.angle-90))
            game.playBulletSound()
            break;
    }
}

export function handleKeyReleased(event, game) {
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

export function generateAsteroids(ctx, game) {
    if (asteroids.length < (game.minimumAsteroids + game.minimumAsteroids*game.gameMode)) {
        var edge = getRandomIntInclusive(0, 3)
        var x = 0
        var y = 0
        var speed = getRandomIntInclusive(2, 3)
        var angle = 0

        switch (edge) {
            case 0:
                // Generate at left edge
                x = -100
                y = getRandomIntInclusive(0, ctx.canvas.height)
                angle = getRandomIntInclusive(-80, 80)
                break;
            case 1:
                // Generate at top edge
                x = getRandomIntInclusive(ctx.canvas.width, 0)
                y = -100
                angle = getRandomIntInclusive(10, 170)
                break;
            case 2:
                // Generate at right edge
                x = ctx.canvas.width
                y = getRandomIntInclusive(0, ctx.canvas.height)
                angle = getRandomIntInclusive(100, 260)
                break;
            case 3:
                // Generate at bottom edge
                x = getRandomIntInclusive(ctx.canvas.width, 0)
                y = ctx.canvas.height
                angle = getRandomIntInclusive(190, 350)
                break;
        }

        asteroids.push(new Asteroid(new Point2D(x, y), speed, angle))
    }
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
     * Draw background
     */
    function drawBg(bg, speed) {
        ctx.fillStyle = bg
        ctx.setTransform(1, 0, 0, 1, bgOffsetX*speed, bgOffsetY*speed)
        ctx.fillRect(-bgOffsetX*speed, -bgOffsetY*speed, ctx.canvas.width, ctx.canvas.height)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
    
    var bg0 = ctx.createPattern("assets/bg/bg0.png", "repeat")
    var bg1 = ctx.createPattern("assets/bg/bg1.png", "repeat")
    var bg2 = ctx.createPattern("assets/bg/bg2.png", "repeat")
    var bg3 = ctx.createPattern("assets/bg/bg3.png", "repeat")

    bgOffsetX += bgOffsetDx
    bgOffsetY += bgOffsetDy

    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
    drawBg(bg0, 0.1)
    drawBg(bg1, 0.3)
    drawBg(bg2, 0.4)
    drawBg(bg3, 0.6)
    /**************/

    /**
     * Draw all objects
     */
    generateAsteroids(ctx, game)
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
            game.gameOver()
            console.log("Asteroid Collided with ship. Game Over !!!")
        }
    }

    for (var i in bullets) {
        for (var j in asteroids) {
            if (CollisionDetector.isColliding(greinerHormann, bullets[i], asteroids[j])) {
                bullets.splice(i, 1)
                var removed = asteroids.splice(j, 1)[0]
                game.playExplosionSound()
                game.score += removed.scoreValue

                if (!removed.small) {
                    asteroids.push(new Asteroid(new Point2D(removed.pos.x, removed.pos.y), removed.speed, removed.angle-15, true))
                    asteroids.push(new Asteroid(new Point2D(removed.pos.x, removed.pos.y), removed.speed, removed.angle+15, true))
                }
            }
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
