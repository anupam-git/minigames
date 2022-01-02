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
import QtMultimedia 5.15

import "game.mjs" as Game

Item {
    id: root

    width: 600
    height: 600

    focus: true

    Keys.onPressed: {
        Game.handleKeyPressed(event, game)
    }
    Keys.onReleased: {
        Game.handleKeyReleased(event, game)
    }
    
    QtObject {
        id: game

        property int score: 0
        property int fps: 0
        property bool pause: false
        property int gameMode: 0
        property int minimumAsteroids: 5
        property bool musicMuted: false

        function gameModeStr() {
            switch(game.gameMode) {
                case 0:
                    return "Easy"
                case 1:
                    return "Medium"
                case 2:
                    return "Hard"
            }
        }

        function gameOver() {
            game.pause = true
            gameoverSound.play()
            completedDialog.open()
        }

        function reset() {
            Game.reset()
            
            game.score = 0
            game.fps = 0
            game.pause = false

            contentLoader.source = Qt.resolvedUrl("./menu.qml")
            music.volume = 0.4
        }

        function playBulletSound() {
            bulletSound.play()
        }

        function playExplosionSound() {
            explosionSound.play()
        }
    }

    FontLoader {
        id: atariClassicFont
        source: "assets/fonts/AtariClassic.ttf"
    }

    SoundEffect {
        id: bulletSound
        source: Qt.resolvedUrl("assets/sounds/bullet.wav")
        volume: 0.5
    }

    SoundEffect {
        id: explosionSound
        source: Qt.resolvedUrl("assets/sounds/explosion.wav")
        volume: 0.8
    }

    SoundEffect {
        id: gameoverSound
        source: Qt.resolvedUrl("assets/sounds/gameover.wav")
        volume: 0.5
    }

    SoundEffect {
        id: music
        source: Qt.resolvedUrl("assets/sounds/music.wav")
        volume: 0.4
        loops: SoundEffect.Infinite
        muted: game.musicMuted
        Component.onCompleted: {
            play()
        }
    }
    
    Dialog {
        id: completedDialog
        width: Math.min(Math.max(root.width*0.6, 300), 500)
        height: 200
        modal: true
        anchors.centerIn: parent
        closePolicy: Popup.NoAutoClose
        footer: Item {
            height: 30
            RowLayout {
                height: parent.height
                anchors.right: parent.right
                anchors.bottom: parent.bottom
                anchors.rightMargin: 8
                anchors.bottomMargin: 8

                RoundButton {
                    Layout.preferredHeight: parent.height
                    radius: 4
                    text: qsTr("Quit")
                    onClicked: {
                        Qt.exit(0)
                    }
                }
                RoundButton {
                    Layout.preferredHeight: parent.height
                    radius: 4
                    text: qsTr("New Game")
                    onClicked: {
                        game.reset()
                        completedDialog.close()
                    }
                }
            }
        }
        contentItem: Item {
            ColumnLayout {
                anchors.centerIn: parent
                spacing: 16

                Label {
                    Layout.alignment: Qt.AlignCenter
                    text: qsTr("Collision !")
                    font.pointSize: 16
                }
                Label {
                    Layout.alignment: Qt.AlignCenter
                    text: qsTr("Your Score : %1").arg(game.score)
                }
            }
        }
        
        Overlay.modal: Rectangle {
            color: "#88000000"
        }
    }

    Rectangle {
        anchors.fill: parent
        color: "#ff222222"

        ColumnLayout {
            anchors.fill: parent
            spacing: 0

            Rectangle {
                Layout.fillWidth: true
                Layout.fillHeight: false
                Layout.preferredHeight: 50
                color: "#22f5f5f5"

                RowLayout {
                    anchors.fill: parent
                    anchors.margins: 8

                    Label {
                        Layout.fillWidth: true
                        Layout.fillHeight: true
                        verticalAlignment: Text.AlignVCenter
                        color: "white"
                        text: qsTr("Score: %1").arg(game.score)
                    }
                    Label {
                        Layout.fillHeight: true
                        verticalAlignment: Text.AlignVCenter
                        color: "white"
                        text: qsTr("FPS: %1").arg(game.fps)
                    }
                    RoundButton {
                        Layout.fillHeight: true
                        radius: 4
                        icon.name: "view-refresh"
                        onClicked: game.reset()
                    }
                    RoundButton {
                        Layout.fillHeight: true
                        radius: 4
                        icon.name: "system-shutdown"
                        onClicked: Qt.exit(0)
                    }
                }
            }

            Item {
                Layout.fillWidth: true
                Layout.fillHeight: true

                Loader {
                    id: contentLoader
                    anchors.fill: parent
                    source: Qt.resolvedUrl("./menu.qml")
                }
            }
        }
    }
}
