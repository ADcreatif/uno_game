"use strict";

class Player{
    constructor(id){
        this.id = id;
        this.name = this.getRandomName();
        this.deck = [];
    }

    getName() {
        return this.name;
    }

    getRandomName(){
        return name_samples[Math.floor(Math.random()*name_samples.length)]
    }

    setDeck(deck){
        this.deck = deck;
    }

    removeCardFromDeck(cardToRemove) {
        $(this.deck).each(function (index, card) {
            if (card.id === cardToRemove.id) {
                this.deck.splice(index, 1);
            }
        }.bind(this));
        //console.log((this.deck)) ;
    }

    getDeck(){
        return this.deck;
    }

    addCard(card) {
        this.deck.push(card);
    }
}

