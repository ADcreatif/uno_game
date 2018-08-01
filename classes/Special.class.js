"use strict";

class Specials extends Card{
    constructor(id, color, bonus){
        super(id);
        this.bonus = bonus;
        this.setColor(color);
        this.setName();

        this.setType("special");
    }

    getBonus() {
        return this.bonus
    };

    getTagContent() {
        switch (this.bonus) {
            case '+2':
                return '<span>+</span>2';
                break;
            case 'invert':
                return '<i class="fas fa-arrows-alt-h"></i>';
                break;
            case 'pass':
                return '<i class="fas fa-ban"></i>';
                break;
        }
    }

    triggerAction(game) {
        switch (this.bonus) {
            case '+2':
                game.pendingCards += 2;
                Display.showPendingCards(game.pendingCards);
                break;
            case 'invert':
                game.clockWise = !game.clockWise;
                Display.showMessage("Changement de sens");
                break;
            case 'pass':
                game.nextTurn();
                Display.showMessage("Quelqu'un a passé son tour");
                break;
        }
    }
}