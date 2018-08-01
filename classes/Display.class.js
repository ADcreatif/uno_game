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
            .attr('id', card.id);
    }

    static updatePlayerName(player) {
        $('#player_infos').text('au tour de ' + player.getName() + ' de jouer.');
    }

    static showMessage(message) {
        let $message = $('#message');

        // afficher le message d'info
        $message.text(message).fadeIn();

        // masquer l'élément au bout de 5secondes
        setTimeout(() => {
            $message.fadeOut('slow');
        }, 5000)
    }

    static showPendingCards(pendingCards) {
        let infos = $('#infos');

        // afficher le nombre de cartes en attente
        if (pendingCards > 0) {
            infos.text("il y a " + pendingCards + " cartes en attente.").fadeIn();
        } else {
            infos.fadeOut('slow');
        }
    }

    static showPlayersInfos(players, currentPlayerId) {
        let ul = $('<ul>');

        $(players).each(function () {
            if (this) {
                let li = $('<li>');
                let text = this.getName() + ' (' + this.getDeck().length + ')';
                if (this.id === currentPlayerId) {
                    li.addClass('current_player')
                }
                ul.append(li.text(text));
            }
        });
        $('#players_infos').empty().append(ul);
    }

    static showPlayableCards(playableCards) {
        $('.cards').removeClass('playable');

        $.each(playableCards, (e, item) => {
            $('#' + item.id).addClass('playable');
        })
    }
}



