'use strict';

var totalScore = 20;
var successMessage = 'You won';

function Grid(title) {
    this.title = title;
    this.flipped = false;
}

Grid.prototype.flip = function() {
    this.flipped = !this.flipped;
}

function createDeck(tileColorName) {
    var tileDeck = [];
    tileColorName.forEach(function(name) {
        tileDeck.push(new Grid(name));
        tileDeck.push(new Grid(name));
    });

    return tileDeck;
}

function createGrid(tileDeck) {
    var gridSize = Math.sqrt(tileDeck.length),
        grid = [];
    for (var row = 0; row < gridSize; row++) {
        grid[row] = [];
        for (var col = 0; col < gridSize; col++) {
            grid[row][col] = removeTile(tileDeck);
        }
    }
    return grid;
}

function Game(tileColorName) {
    var tileDeck = createDeck(tileColorName);

    this.grid = createGrid(tileDeck);
    this.unMatchedPairs = tileColorName.length;

    this.flipTile = function(tile) {
      this.start = true;
        if (tile.flipped) {
            return;
        }

        tile.flip();

        if (!this.firstPick || this.secondPick) {

            if (this.secondPick) {
                this.firstPick.flip();
                this.secondPick.flip();
                this.firstPick = this.secondPick = undefined;
            }

            this.firstPick = tile;

        } else {

            if (this.firstPick.title === tile.title) {
                this.unMatchedPairs--;
                this.message = (this.unMatchedPairs > 0) ? '' : successMessage;
                this.firstPick = this.secondPick = undefined;
                this.newValue = totalScore += 10;
                this.completed = (this.unMatchedPairs > 0) ? false : true;
            } else {
                this.secondPick = tile;
            }
        }
    }
}

function removeTile(tileDeck) {
    var i = Math.floor(Math.random() * tileDeck.length);
    return tileDeck.splice(i, 1)[0];
}
