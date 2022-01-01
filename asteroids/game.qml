/*
MIT License

Copyright (c) 2021 Anupam Basak <anupam.basak27@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import QtQuick 2.15
import QtQuick.Controls 2.15
import QtQuick.Layouts 1.15

import "asteroids.mjs" as Asteroids
import "Util.mjs" as Util
import "greiner-hormann.min.js" as GH

Canvas {
    id: canvas
    anchors.fill: parent

    onPaint: {
        var ctx = getContext("2d");

        function draw() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.fillStyle = Qt.rgba(0, 0, 0, 1);
            ctx.fillRect(0, 0, width, height);

            Asteroids.loop(ctx, game, greinerHormann)

            requestAnimationFrame(draw);
        }

        draw();
    }

    Timer {
        repeat: false
        interval: 1000
        running: true
        onTriggered: {
            var edge = Util.getRandomIntInclusive(0, 3)
            var x = 0
            var y = 0
            var angle = 0

            switch (edge) {
                case 0:
                    // Generate at left edge
                    x = -100
                    y = Util.getRandomIntInclusive(0, canvas.height)
                    angle = Util.getRandomIntInclusive(-80, 80)
                    break;
                case 1:
                    // Generate at top edge
                    x = Util.getRandomIntInclusive(canvas.width, 0)
                    y = -100
                    angle = Util.getRandomIntInclusive(10, 170)
                    break;
                case 2:
                    // Generate at right edge
                    x = canvas.width
                    y = Util.getRandomIntInclusive(0, canvas.height)
                    angle = Util.getRandomIntInclusive(100, 260)
                    break;
                case 3:
                    // Generate at bottom edge
                    x = Util.getRandomIntInclusive(canvas.width, 0)
                    y = canvas.height
                    angle = Util.getRandomIntInclusive(190, 350)
                    break;
            }

            Asteroids.generateAsteroid(
                x,
                y,
                Util.getRandomIntInclusive(2, 3),
                angle
            )

            interval = Util.getRandomIntInclusive(1000, 1500)
            start()
        }
    }
}
