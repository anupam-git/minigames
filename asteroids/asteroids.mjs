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

var fps = 0
var fpsStartTime = new Date().getTime()

var ship = new Ship(50, 50, 80)

export function handleKeyPressed(event) {
    switch (event.key) {
        case Qt.Key_Left:
            ship.startMoveLeft()
            break;
        case Qt.Key_Right:
            ship.startMoveRight()
            break;
        case Qt.Key_Up:
            ship.startMoveUp()
            break;
        case Qt.Key_Down:
            ship.startMoveDown()
            break;
    }
}

export function handleKeyReleased(event) {
    switch (event.key) {
        case Qt.Key_Left:
            ship.stopMoveLeft()
            break;
        case Qt.Key_Right:
            ship.stopMoveRight()
            break;
        case Qt.Key_Up:
            ship.stopMoveUp()
            break;
        case Qt.Key_Down:
            ship.stopMoveDown()
            break;
    }
}

export function loop(ctx, game) {
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

    ship.draw(ctx)
}
