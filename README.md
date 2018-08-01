### Jeu du Uno
Nous avons réalisé ce projet avec les élèves du LIVE 08 de la formation en ligne [3WA LIVE](https://live.3wa.fr/)

## technologie et fichiers
Ce jeu est développé entièrement en programmation objet. En javascript avec Ecma Script 6 et jQuery.

Il existe 3 classes principales: 
 - _Game.class.js_ qui gère les tours et la cohésion du jeu
 - _CardManager.class.js_ c'est la Factory pour les cartes, elle gère leur distribution
 - _Display.class.js_ qui gère la vue et l'affichage
 
 
## règles
- on doit poser toutes ses cartes pour gagner
- on pose une carte à tour de rôle et on applique ses effets. 
- pour poser une carte elle doit respecter au moins une de ces règle :
  - même couleur
  - même valeur (cartes spéciales inclues)
  - être un joker
- si on ne peux pas poser on pioche (jusqu'a 3 cartes avant de passer son tour) 
- les cartes +2 et +4 sont cumulables entre les joueurs
