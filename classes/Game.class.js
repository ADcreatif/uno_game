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

        //console.log(this.get_winner());

        let currentPlayer = this.players[this.currentPlayer];

        //----------------------------------------- DEBUT DU TOUR ----------------------------------
        let deck = currentPlayer.getDeck();
        if(this.currentTurn === 0){
            this.currentCard = this.cardManager.pickRandomCard();
        }

        Display.updatePlayerDeck(deck);
        Display.updateCurrentCard(this.currentCard);

        //----------------------------------------- FIN DU TOUR ----------------------------------
        // sélection du joueur suivant

        // set player as winner
        this.players[2].setDeck([]);

        // quand on arrive au dernier joueur on repart au premier
        // this.currentPlayer = this.currentPlayer < this.player_qty ? this.currentPlayer+1 : 0 ;

        // vérification des victoires et relance du tour;
        if( this.get_winner === false)
            this.game_loop();
    }


    onClickCard(event) {
        // identifier l'id de la carte qui vient d'être jouée
        let id = $(event.currentTarget).data('id');
        let player = this.players[this.currentPlayer];

        try {
            if ($(event.currentTarget).data('pile') === true) {
                player.addCard(this.cardManager.pickRandomCard());
            } else {

                let cardToPlay = this.cardManager.getCardById(id);
                let currentCard = this.currentCard;

                // vérifier que le joueur peut poser cette carte
                this.cardManager.canPlay(cardToPlay, currentCard);

                // effacer la carte dans le deck du joueur
                player.removeCardFromDeck(cardToPlay);

                // choisir la carte comme "jouée"
                this.currentCard = cardToPlay;

                // raffraichir l'affichage
                Display.updateCurrentCard(this.currentCard);
            }

            // rafraichir les cartes du joueur
            Display.updatePlayerDeck(player.getDeck());

        } catch (e) {
            console.log(e);
        }
    }

    onClickSortCards() {
        // récupération des cartes du joueur
        let player = this.players[this.currentPlayer];

        // on réorganise les cartes
        player.setDeck(CardManager.sortCards(player.getDeck()));

        // rafraichi l'affichage
        Display.updatePlayerDeck(player.getDeck());
    }

    start(){
        this.cardManager.generateCards();

        // todo : reset dynamic quantities
        //this.player_qty = parseInt(prompt('Combien de joueurs ?'));
        this.player_qty = 3;

        // création des joueurs
        for(let player_id = 0; player_id < this.player_qty; player_id++ ){
            let player = new Player(player_id);

            // récupération de cartes des joueurs
            let playerDeck = CardManager.sortCards(this.cardManager.getPlayerDeck());
            player.setDeck(playerDeck);
            this.players.push(player);
        }

        $('main').on('click', '.card', this.onClickCard.bind(this));
        $('#sortCards').click(this.onClickSortCards.bind(this));

        // démarrage du jeu
        this.game_loop();
    }

}