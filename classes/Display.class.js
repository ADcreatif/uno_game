"use strict";


class Display {


    static showCards(deck){
        let ul = $('<ul>');

        for(let index in deck){
            if(deck.hasOwnProperty(index)){
                ul.append(
                    $('<li>').text(deck[index].getName()).addClass('card '+ deck[index].type)
                );
            }
        }
        $('#player_deck').append(ul);
    }

    static  showCurrentCard(card){
        $('#stack').append(
            $('<li>').text(card.getName()).addClass('card '+ card.type)
        )
    }
}