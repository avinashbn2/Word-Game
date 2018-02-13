app.service('wordPuzzleGenerator', function() {
    this.chosenWords = [];
    this.fillEmptyTiles = function(wordPuzzle) {

        for (var i = 0; i < wordPuzzle.rows.length; i++) {
            console.log(wordPuzzle.rows);
            for (var j = 0; j < wordPuzzle.rows[i].spots.length; j++) {
                console.log(wordPuzzle.rows[i].spots[j].letter);
                if (wordPuzzle.rows[i].spots[j].letter == null || wordPuzzle.rows[i].spots[j].letter == "") {
                    var x = String.fromCharCode(65 + Math.floor((Math.random() * 26)));
                    wordPuzzle.rows[i].spots[j].letter = x;
                    console.log("hjj");
                }
            }
        }
        return wordPuzzle;
    };
    this.getChosenWords = function() {
        return this.chosenWords;
    }
    this.generateWords = function(wordPuzzle) {
        for (var i = 0; i < words.length; i++) {
            var flag = false;

            var posX = Math.floor(Math.random() * 9);
            var posY = Math.floor(Math.random() * 9);

            if (wordPuzzle.rows[posY].spots[posX].letter == null) {

                if (posX >= words[i].length + 1) {
                    for (var j = posX - words[i].length + 1; j <= posX; j++) {
                        if (wordPuzzle.rows[posY].spots[j].letter != null) {
                            flag = true;
                        }
                    }
                    if (!flag) {

                        for (var j = posX - words[i].length + 1, k = 0; j <= posX; j++, k++) {
                            wordPuzzle.rows[posY].spots[j].letter = words[i].charAt(k);
                        }
                        this.chosenWords.push(words[i]);
                        flag = false;
                    }

                    console.log(posX + ":" + posY + " 1 " + words[i]);

                }
                else if (posY >= words[i].length + 1) {

                    for (var j = posY - words[i].length + 1; j <= posY; j++) {
                        if (wordPuzzle.rows[j].spots[posX].letter != null) {
                            flag = true;
                        }
                    }
                    if (!flag) {

                        for (var j = posY - words[i].length + 1, k = 0; j <= posY; j++, k++) {
                            wordPuzzle.rows[j].spots[posX].letter = words[i].charAt(k);
                        }
                        this.chosenWords.push(words[i]);

                        flag = false;
                    }

                    console.log(posX + ":" + posY + " 2 " + words[i])
                }
                else if (posX < words[i].length + 1 && posX + words[i].length + 1 < wordPuzzle.rows.length) {
                    console.log(posX + ":" + posY + " 3 " + words[i]);
                    for (var j = posX; j <= posX + words[i].length + 1; j++) {
                        if (wordPuzzle.rows[posY].spots[j].letter != null) {
                            flag = true;
                        }
                    }
                    if (!flag) {

                        for (var j = posX, k = 0; j <= posX + words[i].length + 1; j++, k++) {
                            wordPuzzle.rows[posY].spots[j].letter = words[i].charAt(k);
                        }
                        this.chosenWords.push(words[i]);

                        flag = false;
                    }

                }
                else if (posY < words[i].length + 1 && posY + words[i].length + 1 < wordPuzzle.rows.length) {
                    for (var j = posY; j <= posY + words[i].length + 1; j++) {
                        console.log(wordPuzzle.rows[j]);

                        if (wordPuzzle.rows[j].spots[posX].letter != null) {
                            flag = true;
                        }
                    }
                    if (!flag) {

                        for (var j = posY, k = 0; j <= posY + words[i].length + 1; j++, k++) {
                            console.log(wordPuzzle.rows[j]);
                            wordPuzzle.rows[j].spots[posX].letter = words[i].charAt(k);
                        }
                        this.chosenWords.push(words[i]);

                        flag = false;
                    }

                    console.log(posX + ":" + posY + " 4 " + words[i])
                }


            }

        }

    }

});
