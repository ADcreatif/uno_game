"use strict";


class Joker extends Card{
    constructor(id, color, bonus) {
        super(id);
        this.bonus = bonus;
        this.setColor(color);
        this.setName();
        this.setType("joker");
    }

    triggerAction(game) {
        // choix de la couleur
        let content = '<table><tr>' +
            '<td class="rouge" data-color="0"></td>' +
            '<td class="bleu" data-color="1"></td>' +
            '</tr><tr>' +
            '<td class="vert" data-color="2"></td>' +
            '<td class="jaune" data-color="3"></td>' +
            '</tr></table>';
        modal('color_choice', content, 'Choisissez votre couleur', game.onClickChangeColor.bind(game));

        if (this.bonus === "+4 Super Joker") {
            game.pendingCards += 4;
        }

    }

}