import QtQuick 2.15
import QtQuick.Controls 2.15
import QtQuick.Layouts 1.15
import QtMultimedia 5.15

import "sudoku.js" as Sudoku

Item {
    id: root

    width: 360
    height: 600

    Component.onCompleted: startupTimer.start()
    
    Timer {
        id: startupTimer
        interval: 1
        repeat: false
        onTriggered: newGamePopup.open()
    }
    
    Timer {
        id: elapsedTimer
        interval: 1000*30 // Trigger every 30 seconds
        repeat: true
        onTriggered: {
            game.elapsedMinutes = parseInt((new Date().getTime() - game.startTime)/60000)
        }
    }
    
    SoundEffect {
        id: tapSoundEffect
        source: Qt.resolvedUrl("./tap.wav")
        volume: 0.3
    }
    
    SoundEffect {
        id: eraseSoundEffect
        source: Qt.resolvedUrl("./erase.wav")
        volume: 0.3
    }
    
    SoundEffect {
        id: completeSoundEffect
        source: Qt.resolvedUrl("./complete.wav")
        volume: 0.3
    }

    QtObject {
        id: game

        property var selectedCell: ({
            subgridIndex: -1,
            cellIndex: -1
        })
        property real startTime: 0
        property int elapsedMinutes: 0
        property var board: ([
            [], [], [],
            [], [], [],
            [], [], []
        ])

        /**
         * mode : "easy", "medium" or "hard"
         */
        function newGame(mode="easy") {
            game.reset()

            var boardStr = sudoku.generate(mode)

            for (var i in boardStr) {
                var row = parseInt(i/9)
                var col = parseInt(i%9)
                var subgrid = parseInt(row/3)%3*3+parseInt(col/3)

                game.board[subgrid].push({
                    text: boardStr[i] == "." ? "" : boardStr[i],
                    isEditable: boardStr[i] == "." ? true : false
                })
            }

            game.startTime = (new Date()).getTime()
            elapsedTimer.start()

            mainGrid.model = []
            mainGrid.model = game.board
        }

        function reset() {
            for (var i=0; i<game.board.length; i++) {
                game.board[i] = []
            }

            game.startTime = 0
            game.elapsedMinutes = 0
            game.selectedCell = null
        }

        function fillSelectedCell(val) {
            game.board[game.selectedCell.subgridIndex][game.selectedCell.cellIndex].text = val

            mainGrid.model = []
            mainGrid.model = game.board

            if (!game.isComplete()) {
                completedDialog.open()
                completeSoundEffect.play()
            }
        }

        // Derived from : https://gist.github.com/maxx1128/c5c62dd09291f10bc7e8c0b77df80dbb
        function isComplete() {
            var board = [[],[],[],[],[],[],[],[],[]]

            for (var i in game.board) {
                for (var j in game.board[i]) {
                    var text = game.board[i][j].text
                    board[parseInt(i/3)*3 + parseInt(j/3)].push(text == "" ? 0 : parseInt(text))
                }
            }

            const isSudokuArrayValid = (array) => {
                const row = array.slice(0).sort().join(''),
                    passingRow = [1,2,3,4,5,6,7,8,9].join('');

                return (row === passingRow);
            };

            const testRows = (board) => board.every(row => isSudokuArrayValid(row));

            const testColumns = (board) => {
                const gatherColumn = (board, columnNum) => board.reduce((total, row) => [...total, row[columnNum]], []);
                return [0,1,2,3,4,5,6,7,8].every(i => isSudokuArrayValid(gatherColumn(board, i)));
            }

            const testSquares = (board) => {
                const getSquareIndexes = (num) => {
                    if (num === 1) {
                        return [0,1,2];
                    } else if (num === 2) {
                        return [3,4,5];
                    } else {
                        return [6,7,8];
                    }
                }

                const getSquareValues = (x, y, board) => {
                    let values = [],
                        rows = getSquareIndexes(x),
                        columns = getSquareIndexes(y);

                    rows.forEach(row => {
                        columns.forEach(column => {
                        values.push(board[row][column]);
                        });
                    });

                    return values;
                };

                const squareSections = [1,2,3];
                return squareSections.every(squareX => {
                    return squareSections.every(squareY => isSudokuArrayValid(getSquareValues(squareX, squareY, board)));
                });
            };

            return (testRows(board) && testColumns(board) && testSquares(board))
        }
    }
    
    Popup {
        id: newGamePopup
        modal: true
        anchors.centerIn: parent
        width: 200
        height: 250
        contentItem: ColumnLayout {
            Label {
                Layout.alignment: Qt.AlignCenter
                text: qsTr("New Game")
                font.pointSize: 16
            }
            Item {
                Layout.fillWidth: true
                Layout.fillHeight:true
                
                ColumnLayout {
                    anchors.centerIn: parent
                    
                    Label {
                        Layout.alignment: Qt.AlignCenter
                        text: qsTr("Select Game Mode")
                        font.pointSize: 11
                        Layout.bottomMargin: 12
                    }
                    
                    RoundButton {
                        Layout.alignment: Qt.AlignCenter
                        Layout.fillWidth: true
                        text: qsTr("Easy")
                        radius: 4
                        onClicked: {
                            game.newGame("easy")
                            newGamePopup.close()
                        }
                    }
                    
                    RoundButton {
                        Layout.alignment: Qt.AlignCenter
                        Layout.fillWidth: true
                        text: qsTr("Medium")
                        radius: 4
                        onClicked: {
                            game.newGame("medium")
                            newGamePopup.close()
                        }
                    }
                    
                    RoundButton {
                        Layout.alignment: Qt.AlignCenter
                        Layout.fillWidth: true
                        text: qsTr("Hard")
                        radius: 4
                        onClicked: {
                            game.newGame("hard")
                            newGamePopup.close()
                        }
                    }
                }
            }
        }
        
        Overlay.modal: Rectangle {
            color: "#88000000"
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
                        newGamePopup.open()
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
                    text: qsTr("You've completed the game in %1 minutes").arg(game.elapsedMinutes)
                }
            }
        }
        
        Overlay.modal: Rectangle {
            color: "#88000000"
        }
    }

    ColumnLayout {
        anchors.fill: parent

        Rectangle {
            Layout.fillWidth: true
            Layout.fillHeight: false
            Layout.preferredHeight: 50
            color: "#fff5f5f5"

            RowLayout {
                anchors.fill: parent
                anchors.margins: 8

                Label {
                    Layout.fillWidth: true
                    text: qsTr("Time Elapsed: %1 mins").arg(game.elapsedMinutes)
                }
                RoundButton {
                    Layout.preferredHeight: parent.height
                    radius: 4
                    icon.name: "view-refresh"
                    onClicked: newGamePopup.open()
                }
                RoundButton {
                    Layout.preferredHeight: parent.height
                    radius: 4
                    icon.name: "system-shutdown"
                    onClicked: Qt.exit(0)
                }
            }
        }

        Item {
            Layout.fillWidth: true
            Layout.fillHeight: true

            GridLayout {
                id: mainGrid

                property alias model: mainGridRepeater.model

                width: Math.min(parent.width, parent.height)-80
                height: width
                rows: 3
                columns: 3
                rowSpacing: 0
                columnSpacing: 0
                anchors.centerIn: parent

                Repeater {
                    id: mainGridRepeater
                    model: game.board
                    delegate: Rectangle {
                        Layout.fillWidth: true
                        Layout.fillHeight: true
                        color: "transparent"
                        radius: 0
                        border.width: 1
                        border.color: "#33000000"

                        GridView {
                            id: subgrid

                            property int gridIndex: index

                            anchors.fill: parent
                            cellWidth: width/3
                            cellHeight: height/3

                            model: modelData.length == 9 ? modelData : 9
                            delegate: Rectangle {
                                id: gridCell

                                property int subgridIndex: subgrid.gridIndex
                                property int cellIndex: index
                                property bool isSelected: game.selectedCell && game.selectedCell.subgridIndex == subgridIndex && game.selectedCell.cellIndex == cellIndex

                                width: subgrid.cellWidth
                                height: subgrid.cellHeight
                                color: modelData.isEditable ? "transparent" : "#fff5f5f5"
                                border.width: isSelected ? 2 : 1
                                border.color: isSelected ? "#ff2196f3" : "#22000000"

                                Label {
                                    anchors.centerIn: parent
                                    font.pointSize: parent.width*0.4
                                    text: modelData.text ? modelData.text : ""
                                }

                                MouseArea {
                                    anchors.fill: parent
                                    onClicked: {
                                        if (isSelected || !modelData.isEditable) {
                                            game.selectedCell = {
                                                subgridIndex: -1,
                                                cellIndex: -1
                                            }
                                        } else {
                                            game.selectedCell = {
                                                subgridIndex: gridCell.subgridIndex,
                                                cellIndex: gridCell.cellIndex
                                            }
                                            tapSoundEffect.play()
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        Rectangle {
            Layout.fillWidth: true
            Layout.fillHeight: false
            Layout.preferredHeight: 50
            color: "#fff5f5f5"

            RowLayout {
                anchors.fill: parent
                anchors.margins: 8

                Repeater {
                    model: 9
                    delegate: RoundButton {
                        Layout.fillWidth: true
                        Layout.fillHeight: true
                        enabled: game.selectedCell && game.selectedCell.subgridIndex != -1 && game.selectedCell.cellIndex != -1
                        radius: 4
                        text: index+1
                        onClicked: {
                            game.fillSelectedCell(index+1)
                            tapSoundEffect.play()
                        }
                    }
                }

                RoundButton {
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    enabled: game.selectedCell && game.selectedCell.subgridIndex != -1 && game.selectedCell.cellIndex != -1
                    radius: 4
                    icon.name: "draw-eraser"
                    onClicked: {
                        game.fillSelectedCell("")
                        eraseSoundEffect.play()
                    }
                }
            }
        }
    }
}
