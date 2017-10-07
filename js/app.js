'use strict';

var mermoryGame = angular.module('gridGame', []);

mermoryGame.service('game', function() {
    var tileColorName = ['black', 'blue', 'pink', 'red', 'navy', 'green', 'purple', 'teal'];
    return new Game(tileColorName);
});

mermoryGame.controller('gameController', function gameController($scope, game) {
    $scope.game = game;
    $scope.start = false;
    $scope.game.completed = false;
});
