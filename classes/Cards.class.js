"use strict";

class Card {
    constructor(id){
        this.name="";
        this.id = id;
        this.color = 4;
        this.type="";
        this.value = 10;
        this.bonus = "";
    }

    getName(){return this.name;}

    setName() {
        this.name = this.bonus
    }

    getTagContent() {
        return null
    };

    getType() {
        return this.type
    };

    setType(type) {
        this.type = type
    };

    getClass() {
        return ' card ' + this.type + ' ' + this.getColor();
    }

    setColor(color) {
        this.color = color;
    }

    triggerAction() {
    }

    /**
     *
     * @returns {int} the color id value
     */
    getColor() {
        return colors[this.color];
    }

    getValue() {
        return this.value;
    }

}