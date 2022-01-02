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
import QtQuick.Particles 2.15

Item {
    id: root

    property int angle
    property int speed

    width: 50
    height: 100

    ParticleSystem {
        id: particleSystem
    }

    Emitter {
        id: emitter
        anchors.fill: parent
        system: particleSystem
        size: 4
    }

    ImageParticle {
        source: "assets/sprites/particle.png"
        system: particleSystem
    }

    Timer {
        interval: 500
        repeat: false
        running: true
        onTriggered: root.destroy()
    }

    Timer {
        interval: 1
        repeat: true
        running: true
        onTriggered: {
            root.x += root.speed*Math.cos(root.angle*Math.PI/180)
            root.y += root.speed*Math.sin(root.angle*Math.PI/180)
        }
    }

    Component.onCompleted: emitter.burst(1)
}