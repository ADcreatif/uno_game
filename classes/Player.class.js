"use strict";

class Player{
    constructor(id){
        this.id = id;
        this.name = this.getRandomName();
        this.deck=[];
    }

    getRandomName(){
        return name_samples[Math.floor(Math.random()*name_samples.length)]
    }

    setDeck(deck){
        this.deck = deck;
    }

    getDeck(){
        return this.deck;
    }
}

