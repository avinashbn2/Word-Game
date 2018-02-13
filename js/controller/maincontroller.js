/*
    Main Controller
    service - wordPuzzleGenerator
*/
app.controller('MainGameController', function($scope, $timeout, wordPuzzleGenerator, $http) {
    /*
        variables
    */

    // Max time fo gameplay
    $scope.timeLeft = 60;
    $scope.wordPuzzle = {};
    $scope.selectedWord = "";
    $scope.selectedIndices = [];
    //color highlter
    $scope.color = "green";
    $scope.score = 0;
    // words searched
    $scope.chosenWords = [];
    //  the number of words searched  
    $scope.count = 0;
    // stores the score history
    $scope.scoreData = [];
    //timeout function to handle timer
    $scope.onTimeout = function() {
        $scope.timeLeft--;
        if ($scope.timeLeft <= 0) {
            $scope.stop();

        }
        else {
            mytimeout = $timeout($scope.onTimeout, 1000);
        }
    }
    //function to stop timer and compute score
    $scope.stop = function() {
        $timeout.cancel(mytimeout);
        if ($scope.chosenWords.length != $scope.count) {
            $scope.overlayMessage = "SCORE: " + parseInt($scope.score * 100 / (60));
            document.getElementById("overlay").style.display = "block";
            $scope.updateScoreBoard();            
        }
    }
    //hide overlay
    $scope.toggleOverlay = function() {

        document.getElementById("overlay").style.display = "none";
    }
    // initialize the grid of tiles 
    $scope.createWordPuzzle = function() {
        var wordPuzzle = {};
        wordPuzzle.rows = [];

        for (var i = 0; i < 9; i++) {
            var row = {};
            row.spots = [];

            for (var j = 0; j < 9; j++) {
                var spot = {};
                spot.color = "blue";
                spot.letter = null;
                row.spots.push(spot);
            }

            wordPuzzle.rows.push(row);
        }

        return wordPuzzle;
    }
    // on drag of mouse drawColor is called 
    // it changes the color of the tiles
    // @param y: int
    // @param x: int
    $scope.drawColor = function(y, x) {
        var length = $scope.selectedWord.length;

        if ($scope.mouseIsDown) {
            $scope.wordPuzzle.rows[y].spots[x].color = $scope.color;

            if ($scope.selectedIndices.indexOf(y + "," + x) <= -1) {
                $scope.selectedIndices.push(y + "," + x);

                $scope.selectedWord += $scope.wordPuzzle.rows[y].spots[x].letter;
                console.log($scope.selectedIndices);

            }

        }
    }
    // function to update the scores displayed
    $scope.updateScoreBoard = function() {
                    var name = "";
                    if($scope.username==null) {
                        name = new Date().toJSON().replace(/-/g,'/');

                    }else{
                        name = $scope.username;
                    }
                    $scope.scoreData.push({'score': $scope.score,
                    'name' : name});
                    $http.post("/post.php", JSON.stringify($scope.scoreData)).then(function(data, status) {
                        console.log(data);
                        
                    });

    }
    // call drawcolor when mouseDown is activated
    // @param y: int
    // @param x: int
    $scope.setFlag = function(y, x) {
        $scope.mouseIsDown = true;

        this.drawColor(y, x);
        console.log($scope.wordPuzzle.rows[y].spots[x].letter);
    }
    // function to reverse string
    //@param str: string
    $scope.reverse = function(str) {
        var array = str.split("");
        var revArray = array.reverse();
        return revArray.join("");
    }
    //function called when mouseRelease event is triggered
    
    $scope.removeFlag = function() {
            $scope.mouseIsDown = false;
            
            // check if the word selected is in the list of words(data.js)
            
            if (words.indexOf($scope.selectedWord) > -1 || words.indexOf($scope.reverse($scope.selectedWord)) > -1) {
                $scope.color = "green";
                $scope.count++;
                $scope.score += $scope.score + $scope.selectedWord.length;
                // check if the player found all the words correctly
                // also compute the score
                if ($scope.chosenWords.length == $scope.count) {
                    
                    // score is calculated with the formula
                    // (total length of the words searched / timetaken to solve)* 100
                    $scope.score = parseInt($scope.score * 100 / (60 - $scope.timeLeft));
                    $scope.overlayMessage = "SCORE: " + parseInt($scope.score);
                    document.getElementById("overlay").style.display = "block";
                    
                    $scope.stop();
                    $scope.updateScoreBoard();              }

            }
            else {
                for (var i = 0; i < $scope.selectedIndices.length; i++) {
                    var index = $scope.selectedIndices[i].split(",");
                    console.log(index);
                    $scope.wordPuzzle.rows[index[0]].spots[index[1]].color = "#3d4250";

                }
                $scope.color = "green";
            }
            $scope.selectedIndices = [];
            $scope.selectedWord = "";

        }
        
    // function to start timer,
    // initialize grid, generate words
         
    $scope.load = function() {
        
        $http.get("/test.txt").then( function(response){
            $scope.scoreData = response.data || [];
            console.log(response.data);
        });

        var mytimeout = $timeout($scope.onTimeout, 1000);

        $scope.wordPuzzle = $scope.createWordPuzzle();

        wordPuzzleGenerator.generateWords($scope.wordPuzzle);
        wordPuzzleGenerator.fillEmptyTiles($scope.wordPuzzle);

        $scope.chosenWords = wordPuzzleGenerator.getChosenWords();

    }
    $scope.load();



});
