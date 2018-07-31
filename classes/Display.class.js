"use strict";


class Display {


    /**
     * affiche le deck du joueur en cours
     * @param deck {Array} of Cards
     */
    static updatePlayerDeck(deck) {
        let ul = $('<ul>');

        for(let index in deck){
            if(deck.hasOwnProperty(index)){
                ul.append(Display.getCardHTML(deck[index]));
            }
        }
        $('#player_deck').empty().append(ul);
    }

    /**
     * affiche la dernière carte de la défausse
     * @param card {Card}
     */
    static updateCurrentCard(card) {
        $('#discard').append(Display.getCardHTML(card));
    }

    /**
     * Génération du code html d'une carte
     * @param card
     * @returns {*|jQuery}
     */
    static getCardHTML(card) {

        return $('<li>')
            .html(card.getTagContent() || card.getName())
            .addClass(card.getClass())
            .data('id', card.id)
    }

    static updatePlayerName(player) {
        $('#player_infos').text('au tour de ' + player.getName() + ' de jouer.');
    }

    static showMessage(message) {
        $('#message').text(message).fadeIn();
    }
}