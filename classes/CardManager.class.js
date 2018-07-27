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
        this.cards = [];
    }

    /**
     * Pioche une carte au hazard et l'enlève du deck;
     * @returns {Array.<*>}
     */
    pickRandomCard(){
        // TODO : gérer le cas ou la pioche est vide

        // piocher une carte au hazard
        let random = Math.floor(Math.random()*this.cards.length);

        // suppression de la carte du tableau et renvoi de celle-ci
        return this.cards.splice(random,1)[0];
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
        for(let color=0; color < colors.length ; color++){
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
                this.cards.push(new Specials(this.cards.length, color, "inversion"));

                // création des passer son tour
                this.cards.push(new Specials(this.cards.length, color, "passer son tour"));
            }
        }

        for(let number = 0; number < 4; number++){
            this.cards.push(new Joker(this.cards.length, "Joker"));
            this.cards.push(new Joker(this.cards.length, "+4 Super Joker"));
        }
    }
}