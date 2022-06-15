/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */

// ----------------------------------------------------------------------
// ANALISI
// FASE PREPARATORIA
// prendo il livello di difficoltà dal select in HTML
// se 1: 1-100; se 2: 1-81; se 3: 1-49
// genero 16 bombe, numeri compresi tra 1 e maxRange (100, 81, 49)
// maxTentativi = maxRange - bombe (16)
// al click sul bottone genero una griglia con [maxRange] numero di celle

// FASE LOGICA
// click su btn --> reset griglia + inizio gioco
// click su cella: se === bomba ---> cella diventa rossa, gioco finito e alert sconfitta + punteggio
// altrimenti:
//      cella diventa azzurra, impedisco reclick, inserisco in array numeri azzeccati
//
// La partita termina
// se length array numeri azzeccati === maxRange --> gioco finito e alert vittoria
// ----------------------------------------------------------------------
