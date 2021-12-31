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
import QtQml.Models 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import QtMultimedia 5.15

ColumnLayout {
    id: root

    property int moves: 0
    
    anchors.fill: parent

    SoundEffect {
        id: slideSoundEffect
        source: Qt.resolvedUrl("./slide.wav")
        volume: 0.3
    }

    SoundEffect {
        id: tadaSoundEffect
        source: Qt.resolvedUrl("./tada.wav")
        volume: 0.3
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
                        game.newGame()
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
                    text: qsTr("Congratulations!")
                    font.pointSize: 16
                }
                Label {
                    Layout.alignment: Qt.AlignCenter
                    text: qsTr("You've completed the game in %1 moves").arg(root.moves)
                }
            }
        }
    }

    RowLayout {
        Layout.fillWidth: true
        Layout.margins: 16

        Label {
            Layout.fillWidth: true
            text: qsTr("Moves: %1").arg(root.moves)
        }
        RoundButton {
            width: 16
            height: 16
            radius: 4
            icon.name: "view-refresh"
            onClicked: game.newGame()
        }
        RoundButton {
            width: 16
            height: 16
            radius: 4
            icon.name: "system-shutdown"
            onClicked: Qt.exit(0)
        }
    }
    
    QtObject {
        id: game
        
        property int blankCellIndex: 0
        property bool isComplete: {
            var complete = true
            
            for (var i=0; i<gridModel.count; i++) {
                var text = gridModel.get(i).text
                
                if (text && text != `${i+1}`) {
                    complete = false
                    break
                }
            }
            
            return complete
        }
        
        function _shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
        // Derived from SO : https://stackoverflow.com/a/34570524
        function _isSolvable(puzzle) {
            var parity = 0;
            var gridWidth = parseInt(Math.sqrt(puzzle.length));
            var row = 0; // the current row we are on
            var blankRow = 0; // the row with the blank tile
            
            for (var i = 0; i < puzzle.length; i++) {
                if (i % gridWidth == 0) { // advance to next row
                    row++;
                }
                if (puzzle[i] == 0) { // the blank tile
                    blankRow = row; // save the row on which encountered
                    continue;
                }
                for (var j = i + 1; j < puzzle.length; j++) {
                    if (puzzle[i] > puzzle[j] && puzzle[j] != 0) {
                        parity++;
                    }
                }
            }
            
            if (gridWidth % 2 == 0) { // even grid
                if (blankRow % 2 == 0) { // blank on odd row; counting from bottom
                    return parity % 2 == 0;
                } else { // blank on even row; counting from bottom
                    return parity % 2 != 0;
                }
            } else { // odd grid
                return parity % 2 == 0;
            }
        }
        
        function newGame() {
            var arr = []
            
            for (var i=0; i<=15; i++) {
                arr.push(i)
            }
            
            _shuffleArray(arr)
            
            while (!_isSolvable(arr)) {
                console.log("Puzzle not solvable. Reshuffling.")
                _shuffleArray(arr)
            }
            
            gridModel.clear()
            
            for (var i in arr) {
                if (arr[i] == 0) {
                    gridModel.append({})
                    game.blankCellIndex = i
                } else {
                    gridModel.append({text: `${arr[i]}`})
                }
            }
            
            root.moves = 0
            grid.focus = true
        }
        
        function moveBlankCellLeft() {
            if (!game.isComplete && game.blankCellIndex%4 > 0) {
                grid.hdirection = -1
                grid.vdirection = 0
                var removedText = gridModel.get(game.blankCellIndex-1).text
                
                gridModel.remove(game.blankCellIndex-1, 2)
                gridModel.insert(game.blankCellIndex-1, {color: "transparent", text: ""})
                gridModel.insert(game.blankCellIndex, {color: "lightsteelblue", text: removedText})
                game.blankCellIndex -= 1
                postMovementAction()
            }
        }
        function moveBlankCellRight() {
            if (!game.isComplete && game.blankCellIndex%4 < 3) {
                grid.hdirection = 1
                grid.vdirection = 0
                var removedText = gridModel.get(game.blankCellIndex+1).text
                
                gridModel.remove(game.blankCellIndex, 2)
                gridModel.insert(game.blankCellIndex, {color: "lightsteelblue", text: removedText})
                gridModel.insert(game.blankCellIndex+1, {color: "transparent", text: ""})
                game.blankCellIndex += 1
                postMovementAction()
            }
        }
        function moveBlankCellUp() {
            if (!game.isComplete && game.blankCellIndex-4 >= 0) {
                grid.hdirection = 0
                grid.vdirection = -1
                var removedText = gridModel.get(game.blankCellIndex-4).text
                
                gridModel.remove(game.blankCellIndex-4, 1)
                gridModel.remove(game.blankCellIndex-1, 1)
                gridModel.insert(game.blankCellIndex-4, {color: "transparent", text: ""})
                gridModel.insert(game.blankCellIndex, {color: "lightsteelblue", text: removedText})
                game.blankCellIndex -= 4
                postMovementAction()
            }
        }
        function moveBlankCellDown() {
            if (!game.isComplete && game.blankCellIndex+4 <= 15) {
                grid.hdirection = 0
                grid.vdirection = 1
                var removedText = gridModel.get(game.blankCellIndex+4).text
                
                gridModel.remove(game.blankCellIndex+4, 1)
                gridModel.remove(game.blankCellIndex, 1)
                gridModel.insert(game.blankCellIndex, {color: "lightsteelblue", text: removedText})
                gridModel.insert(game.blankCellIndex+4, {color: "transparent", text: ""})
                game.blankCellIndex += 4
                postMovementAction()
            }
        }
        
        function postMovementAction() {
            root.moves++
            slideSoundEffect.play()
            
            if (game.isComplete) {
                tadaSoundEffect.play()
                completedDialog.open()
            }
        }
    }

    Item {
        Layout.fillWidth: true
        Layout.fillHeight: true
        
        MouseArea {
            property real startX
            property real startY
            
            anchors.fill: parent
            z: 999
            
            onPressed: {
                startX = mouse.x
                startY = mouse.y
            }
            onReleased: {
                var xdiff = mouse.x-startX
                var ydiff = mouse.y-startY
                
                if (Math.abs(xdiff) > Math.abs(ydiff)) {
                    if (xdiff > 0) {
                        game.moveBlankCellLeft()
                    } else {
                        game.moveBlankCellRight()
                    }
                } else {
                    if (ydiff > 0) {
                        game.moveBlankCellUp()
                    } else {
                        game.moveBlankCellDown()
                    }
                }
            }
        }
        
        GridView {
            id: grid

            property int hdirection: 1
            property int vdirection: 1
            
            width: 300
            height: 300
            anchors.centerIn: parent
            cellWidth: width/4
            cellHeight: height/4
            focus: true

            add: Transition {
                id: addTransition
                NumberAnimation {
                    properties: "x"
                    from: (addTransition.ViewTransition.index%4 + 1*grid.hdirection) * grid.cellWidth
                    duration: 100
                    easing.type: Easing.InOutQuad
                }
                NumberAnimation {
                    properties: "y"
                    from: (Math.floor(addTransition.ViewTransition.index/4) + 1*grid.vdirection) * grid.cellHeight
                    duration: 100
                    easing.type: Easing.InOutQuad
                }
            }

            Component.onCompleted: {
                game.newGame();
            }

            Keys.onRightPressed: {
                game.moveBlankCellLeft()
            }
            Keys.onLeftPressed: {
                game.moveBlankCellRight()
            }
            Keys.onDownPressed: {
                game.moveBlankCellUp()
            }
            Keys.onUpPressed: {
                game.moveBlankCellDown()
            }

            model: ListModel { id: gridModel }
            delegate: Item {
                width: grid.cellWidth
                height: grid.cellHeight

                Rectangle {
                    width: parent.width-10
                    height: parent.height-10
                    anchors.centerIn: parent
                    color: {
                        if (model.text) {
                            if (model.text == `${index+1}`) {
                                return "#66bb6a"
                            } else {
                                return "lightsteelblue"
                            }
                        } else {
                            return "transparent"
                        }
                    }
                    radius: 3

                    Text {
                        text: model.text ? model.text : ""
                        font.pointSize: 22
                        anchors.centerIn: parent
                    }
                }
            }
        }
    }
}
