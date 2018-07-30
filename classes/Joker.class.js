"use strict";


class Joker extends Card{
    constructor(id, color, bonus) {
        super(id);
        this.bonus = bonus;
        this.setColor(color);
        this.setName();
        this.setType("joker");
    }

}