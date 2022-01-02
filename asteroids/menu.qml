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

Item {
    id: root

    ColumnLayout {
        anchors.centerIn: parent
        spacing: 16

        Item {
            Layout.alignment: Qt.AlignHCenter
            Layout.preferredHeight: label.font.pointSize
            Layout.bottomMargin: label.font.pointSize
            
            Label {
                id: label
                anchors.centerIn: parent
                text: qsTr("Asteroids")
                font.family: atariClassicFont.name
                font.pointSize: 40
                color: "white"
            }
        }

        MenuButton {
            Layout.fillWidth: true
            Layout.preferredHeight: 60
            text: qsTr("New Game")
            onClicked: {
                contentLoader.source = Qt.resolvedUrl("./game.qml")
                music.volume = 0.2
            }
        }

        MenuButton {
            Layout.fillWidth: true
            Layout.preferredHeight: 60
            text: qsTr("Game Mode : %1").arg(game.gameModeStr(game.gameMode))
            onClicked: {
                game.gameMode = game.gameMode == 2 ? 0 : game.gameMode+1
            }
        }

        MenuButton {
            Layout.fillWidth: true
            Layout.preferredHeight: 60
            text: qsTr("Music : %1").arg(game.musicMuted ? "Off" : "On")
            onClicked: {
                if (game.musicMuted) {
                    game.musicMuted = false
                    music.play()
                } else {
                    game.musicMuted = true
                }
            }
        }
    }
}
