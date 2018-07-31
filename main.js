"use strict";
let game;


/**
 gère l'affichage du popup modal
 - on ferme le popup si on clique en dehors
 - on lance le callback si il est défini
 **/
function onClickModal(event) {
    let callback = event.data.callback;

    // executer le callback si défini
    if (typeof callback === 'function') {
        callback(event);

        // cacher le modal
    } else if ($(event.target).is(':not(#modal)') === false) {
        $(this).fadeOut();
    }
}


function modal(className, content, legend, callback, looseFocus) {
    let modal_elm, content_elm, legend_elm;

    modal_elm = $('#modal');
    content_elm = $('<div>').addClass('container ').append(content);
    legend_elm = legend ? $('<p>').addClass('legend').text(legend) : $();

    modal_elm
        .empty()
        .append(content_elm)
        .append(legend_elm)
        .addClass(className)
        .fadeIn('slow')
        .on('click', {callback: callback}, onClickModal);

    // ajustement de la taille de la légende
    legend_elm.width(content_elm.width());
}


$(function(){
    game = new Game();
    game.start();
});