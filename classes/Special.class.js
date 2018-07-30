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
}