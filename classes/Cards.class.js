"use strict";

class Card {
    constructor(id){
        this.name="";
        this.id = id;
        this.color = "";
        this.type="";
    }

    getName(){return this.name;}
    setName(){}

    setColor(color){
        this.color = color;
    }

    getColor(){
        return colors[this.color];
    }
}