"use strict";

/*
     19 cartes rouges numérotées de 0 à 9 (le 0 en un seul exemplaire) ;
     19 cartes vertes numérotées de 0 à 9 (le 0 en un seul exemplaire) ;
     19 cartes jaunes numérotées de 0 à 9 (le 0 en un seul exemplaire) ;
     19 cartes bleues numérotées de 0 à 9 (le 0 en un seul exemplaire) ;
     8 cartes +2 (2 de chaque couleur : rouge, vert, jaune, bleu) ;
     8 cartes inversion (2 de chaque couleur : rouge, vert, jaune, bleu) ;
     8 cartes « passer / passe ton tour » (2 de chaque couleur : rouge, vert, jaune, bleu) ;
 4 cartes Joker ;
 4 cartes « +4 » ou « Super Joker ».
 */

class CardManager {
    constructor(){
        this.pile = [];
        this.cards = [];
    }

    /**
     * retourne une carte en fonction de son ID
     * @param id
     * @returns {*}
     */
    getCardById(id) {
        for (let index in this.cards) {
            if (this.cards[index].id === parseInt(id)) {
                return this.cards[index];
            }
        }
    }

    /**
     * Pioche une carte au hazard et l'enlève du deck;
     * @returns {Array.<*>}
     */
    pickRandomCard(){
        // TODO : gérer le cas ou la pioche est vide

        // piocher une carte au hazard
        let random = Math.floor(Math.random() * this.pile.length);

        // suppression de la carte du tableau et renvoi de celle-ci
        return this.pile.splice(random, 1)[0];
    }

    /**
     * retourne 7 cartes aléatoires
     * @returns {Array}
     */
    getPlayerDeck(){
        let deck = [];
        for(let card=0; card < 7 ; card++){
            deck.push(this.pickRandomCard());
        }
        return deck;
    }

    /**
     * génère la totalité des 108 cartes de UNO
     */
    generateCards(){
        for (let color = 0; color < 4; color++) {
            // création d'un seul zero par couleur
            this.cards.push(new RegularCard(this.cards.length, color, 0));

            for(let pack=1; pack <= 2  ; pack++){
                for(let value=1; value <= 9 ; value++){
                    // création de deux exemplaires de chaque autre cartes
                    this.cards.push(new RegularCard(this.cards.length, color, value ));
                }
            }

            for(let number = 0; number < 2; number++ ){
                // création des cartes +2
                this.cards.push(new Specials(this.cards.length, color, "+2"));

                // création des inversion
                this.cards.push(new Specials(this.cards.length, color, "invert"));

                // création des passer son tour
                this.cards.push(new Specials(this.cards.length, color, "pass"));
            }
        }

        for(let number = 0; number < 4; number++){
            this.cards.push(new Joker(this.cards.length, 4, "Joker"));
            this.cards.push(new Joker(this.cards.length, 4, "+4 Super Joker"));
        }

        // on crée une copie de la pile pour conserver le tas de carte original pour recherches futures.
        Object.assign(this.pile, this.cards);
    }

    /**
     * Vérification des conditions pour poser une carte
     * @param card
     * @param targetCard
     */
    canPlay(card, targetCard) {

        // if(card.getType() === "joker" || (targetCard.getType() === "special" && ((card.getType() === "special" && card.getBonus() === targetCard.getBonus()) || card.getColor() === targetCard.getColor())) || (targetCard.getType() === "regular" && (card.getColor() === targetCard.getColor() || card.getValue() === targetCard.getValue())))
        //   return;

        if (card.getType() === "joker")
            return;

        switch (targetCard.getType()) {
            case "special":
                if (card.getType() === "special" && card.getBonus() === targetCard.getBonus())
                    return;
                if (card.getColor() === targetCard.getColor())
                    return;
                break;

            case "regular":
                if (card.getColor() === targetCard.getColor())
                    return;
                if (card.getValue() === targetCard.getValue())
                    return;
                break;

            /*case "joker":
             return;
             break;*/
        }

        throw "vous ne pouvez pas jouer cette carte";
    }

    static sortCards(deck) {
        let mapped, sorted;

        // création d'un mapping, c'est un tableau qui servira de filtre pour la réorganisation
        mapped = deck.map(function (card, index) {
            let position = colors.indexOf(card.getColor());
            return {index: index, card: card, position: position};
        });

        // réorganisation du tableau de mapping en fonction de la couleur ('position')
        mapped = mapped.sort(function (a, b) {
            return a.position - b.position;
        });

        // réorganisation du tableau du mapping en fonction de la valeur
        mapped = mapped.sort(function (a, b) {
            // si la couleur change, on ne fait rien
            if (a.card.getColor() === b.card.getColor()) {
                return a.card.getValue() - b.card.getValue();
            }
        });

        // application du mapping sur le tableau final
        sorted = mapped.map(function (color) {
            return deck[color.index];
        });

        return sorted;
    }
}