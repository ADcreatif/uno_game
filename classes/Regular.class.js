"use strict";

class RegularCard extends Card{
    constructor(id, color, value ){
        super(id);
        this.value = value;
        this.setColor(color);
        this.setName();

        this.type="regular";
    }

    setName(){
        this.name = "Regular : " + this.value +' '+ this.getColor()
    }
}