"use strict";

class RegularCard extends Card{
    constructor(id, color, value ){
        super(id);
        this.value = value;
        this.setColor(color);
        this.setName();
        this.setType("regular");
    }

    setName(){
        this.name = "<span>" + this.value + '</span>';
    }


}