"use strict";

class Specials extends Card{
    constructor(id, color, bonus){
        super(id);
        this.bonus = bonus;
        this.setColor(color);
        this.setName();

        this.type="special";
    }

    setName(){
        this.name = "Special : " + this.bonus +' '+ this.getColor()
    }
}