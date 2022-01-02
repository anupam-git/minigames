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

import "game.mjs" as Game
import "Util.mjs" as Util
import "greiner-hormann.min.js" as GH

Canvas {
    id: canvas
    anchors.fill: parent

    onPaint: {
        var ctx = getContext("2d");

        function draw() {
            Game.loop(ctx, game, greinerHormann)

            if (!game.pause) {
                requestAnimationFrame(draw);
            }
        }

        draw();
    }

    Component.onCompleted: {
        loadImage("assets/sprites/asteroid.png")
        loadImage("assets/bg/bg0.png")
        loadImage("assets/bg/bg1.png")
        loadImage("assets/bg/bg2.png")
        loadImage("assets/bg/bg3.png")
    }

    function generateExplosionParticles(pos, _angle, _speed) {
        var component = Qt.createComponent("Explosion.qml");
        var obj = component.createObject(canvas, {
            x: pos.x,
            y: pos.y,
            angle: _angle,
            speed: _speed
        });

        if (obj == null) {
            // Error Handling
            console.log("Error creating explosion");
        }
    }
}
