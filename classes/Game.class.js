"use strict";



class Game {

    constructor(){
        this.players = [];
        this.cardManager = new CardManager();
        this.currentPlayer = 1;
        this.currentCard = null;
        this.currentTurn = 0;
        this.clockWise = true;
        this.cardsToGet = 0;
    }

    get_nextPlayer() {
        // quand on arrive au dernier joueur on repart au premier
        if (this.clockWise) {
            this.currentPlayer = this.currentPlayer < this.player_qty ? this.currentPlayer + 1 : 1;
        } else {
            this.currentPlayer = this.currentPlayer > 1 ? this.currentPlayer - 1 : this.player_qty;
        }

        // pour le premier tour, on prend le premier joueur
        if (this.currentTurn === 0)
            this.currentPlayer = 1;

        return this.players[this.currentPlayer];
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
     * Boucle principale réalise le passage au joueur suivant
     */
    nextTurn() {

        // vérification des victoires;
        let winner = this.get_winner();
        if (winner) {
            console.log('nous avons un gagnant : ' + winner);
            return;
        }

        //----------------------------------------- DEBUT DU TOUR ----------------------------------
        let currentPlayer = this.get_nextPlayer();

        if (this.currentTurn === 0) {
            this.currentCard = this.cardManager.pickRandomCard();
        }

        if (this.cardsToGet > 0 && !this.cardManager.canPlayDeck()) {
            for (let quantity = 0; quantity < this.cardsToGet; quantity++) {
                currentPlayer.addCard(this.cardManager.pickRandomCard());
            }
            Display.showMessage('Vous venez de prendre +' + this.cardsToGet + ' dans la tronche ! Quelle joie !');
            this.cardsToGet = 0;
        }

        //----------------------------------------- FIN DU TOUR ----------------------------------
        Display.updateCurrentCard(this.currentCard);
        Display.updatePlayerName(currentPlayer);
        Display.updatePlayerDeck(currentPlayer.getDeck());

        this.currentTurn++;
    }


    onClickCard(event) {
        // identifier l'id de la carte qui vient d'être jouée
        let clicked_card = $(event.currentTarget);

        //console.log(this.players, this.currentPlayer);
        let player = this.players[this.currentPlayer];

        try {
            // si on clique sur la pioche
            if (clicked_card.data('pile') === true) {
                player.addCard(this.cardManager.pickRandomCard());

                // rafraichir le deck du joueur
                Display.updatePlayerDeck(player.getDeck());

                //  si on clique sur la défausse, il ne se passe rien
            } else if (clicked_card.parent('#discard').length > 0) {
                return;

                // si c'est dans le deck du joueur
            } else {
                // on récupère la carte qui à été cliqué
                let id = clicked_card.data('id');
                let cardToPlay = this.cardManager.getCardById(id);

                // vérifier que le joueur peut poser cette carte
                if (!this.cardManager.canPlayCard(cardToPlay, this.currentCard))
                    throw "vous ne pouvez pas jouer cette carte";

                // effacer la carte dans le deck du joueur
                player.removeCardFromDeck(cardToPlay);

                // choisir la carte comme "jouée"
                this.currentCard = cardToPlay;

                this.currentCard.triggerAction(this);

                this.nextTurn();
            }

        } catch (e) {
            console.log(e);
            Display.showMessage(e)
        }
    }

    /**
     * Changement de couleur du Joker
     * @param event
     */
    onClickChangeColor(event) {
        let color = $(event.target).data('color');
        this.currentCard.setColor(color);
        Display.updateCurrentCard(this.currentCard);

        // si la couleur à bien été défini on peut masque le modal
        if (color !== undefined)
            $('#modal').fadeOut('slow');
    }

    onClickSortCards() {
        // récupération des cartes du joueur
        let player = this.players[this.currentPlayer];

        // on réorganise les cartes
        let sorted = CardManager.sortCards(player.getDeck());

        player.setDeck(sorted);

        // rafraichi l'affichage
        Display.updatePlayerDeck(player.getDeck());
    }

    start(){
        this.cardManager.generateCards();

        // todo : reset dynamic quantities
        //this.player_qty = parseInt(prompt('Combien de joueurs ?'));
        this.player_qty = 3;

        // création des joueurs
        for (let player_id = 1; player_id <= this.player_qty; player_id++) {
            let player = new Player(player_id);

            // récupération de cartes des joueurs
            let playerDeck = CardManager.sortCards(this.cardManager.getPlayerDeck());
            player.setDeck(playerDeck);
            this.players[player_id] = player;
        }

        $('main').on('click', '.card', this.onClickCard.bind(this));
        $('#sortCards').click(this.onClickSortCards.bind(this));

        // démarrage du jeu
        this.nextTurn();
    }

}