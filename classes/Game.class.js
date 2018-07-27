"use strict";



class Game {

    constructor(){
        this.players = [];
        this.cardManager = new CardManager();
        this.currentPlayer = 0;
        this.currentCard = null;
        this.currentTurn = 0;
    }

    get_winner(){

        /*let winner = $.each(this.players, function(){
            if(this.deck.length === 0){
                return this
            }
        });*/

        for(let index in this.players){
            if(this.players[index].deck.length === 0){
                return this.players[index];
            }
        }

        return false;
    }

    /**
     * Boucle principale 1 game_loop = 1 tour de jeu..
     */
    game_loop(){

        console.log(this.get_winner());

        let player = this.players[this.currentPlayer];

        //----------------------------------------- DEBUT DU TOUR ----------------------------------
        let deck = player.getDeck();
        if(this.currentTurn === 0){
            this.currentCard = this.cardManager.pickRandomCard();
        }

        Display.showCards(deck);
        Display.showCurrentCard(this.currentCard);

        //----------------------------------------- FIN DU TOUR ----------------------------------
        // sélection du joueur suivant

        // set player as winner
        this.players[2].setDeck([]);

        this.currentPlayer = this.currentPlayer < this.player_qty ? this.currentPlayer+1 : 0 ;

        // vérification des victoires et relance du tour;
        if( this.get_winner === false)
            this.game_loop();
    }


    start(){
        this.cardManager.generateCards();

        // todo : reset dynamic quantities
        //this.player_qty = parseInt(prompt('Combien de joueurs ?'));
        this.player_qty = 3;

        // création des joueurs
        for(let player_id = 0; player_id < this.player_qty; player_id++ ){
            let player = new Player(player_id);

            let playerDeck = this.cardManager.getPlayerDeck();
            player.setDeck(playerDeck);
            this.players.push(player);
        }

        // démarrage du jeu
        this.game_loop();
    }

}