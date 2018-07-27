"use strict";


class Joker extends Card{
    constructor(id, bonus){
        super(id);
        this.bonus = bonus;
        this.setName();

        this.type="joker";
    }

    setName(){
        this.name = this.bonus;
    }
}