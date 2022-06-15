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

// collegamento con il bottone che fa iniziare il gioco
const playBtn = document.getElementById('play_btn');
playBtn.addEventListener('click', startGame);

function startGame() {
  // Elementi HTML
  const mainGrid = document.getElementById('main_grid');

  // a inizio partita svuoto la griglia e rimuovo le classi
  mainGrid.innerHTML = '';
  mainGrid.className = '';

  // numero di bombe nel gioco
  const quantityOfBombs = 16;
  //   variabile che determina la classe della griglia, quindi numero di celle, default su massima difficoltà
  let mainGridClass = 'd_crazy';
  let cellClass = 'd_crazy';

  // chiedo all'utente il livello di difficoltà del gioco
  const difficultyLevel = document.getElementById('difficulty_level').value;
  console.log('livello difficoltà', difficultyLevel);

  // range di numeri per la partita, default su massima difficoltà
  let maxRange = 49;

  // calcolo di maxRange
  if (difficultyLevel === '1') {
    maxRange = 100;
    mainGridClass = 'd_easy';
    cellClass = 'd_easy';
  } else if (difficultyLevel === '2') {
    maxRange = 81;
    mainGridClass = 'd_hard';
    cellClass = 'd_hard';
  }

  // variabile che contiene le bombe
  let bomba = generateBombs(quantityOfBombs, 1, maxRange);
  console.log('bomba', bomba);

  // numero di tentativi, quindi durata massima partita
  const numberOfAttempts = maxRange - quantityOfBombs;
  console.log('# tentativi', numberOfAttempts);

  // array che contiene i numeri indicati dall'utente durante il gioco che non sono bombe
  let safeNumbers = [];

  // generazione della griglia
  generateGrid();

  //   funzione che popola mainGrid
  function generateGrid() {
    // aggiungere classe alla griglia
    mainGrid.classList.add(mainGridClass);

    // a secondo del livello di difficoltà scelto
    for (let i = 1; i <= maxRange; i++) {
      // creare cella
      // <!-- <div class="square"><span>1</span></div> -->
      const newCell = document.createElement('div');
      // aggiungere testo
      newCell.innerHTML = `<span>${i}</span>`;
      //   aggiunta classe square e dimensione dinamica
      newCell.classList.add('square');
      newCell.classList.add(cellClass);
      // aggiungere event listener
      newCell.addEventListener('click', clickOnCell);
      //   appendere a mainGrid
      mainGrid.append(newCell);
    }
  }
  function clickOnCell() {
    // leggere contenuto cella
    const thisNumber = parseInt(this.querySelector('span').innerHTML);
    // se il numero è una bomba, cella rossa e
    if (bomba.includes(thisNumber)) {
      this.classList.add('red');
      //   rendo l'elemento non più cliccabile
      this.style.pointerEvents = 'none';
      // div con testo sconfitta
      gameOutcome('lost', safeNumbers);
      // altrimenti salvo numero in array azzeccati, cella azzurra
    } else {
      this.classList.add('blue');
      //   rendo l'elemento non più cliccabile
      this.style.pointerEvents = 'none';
      safeNumbers.push(thisNumber);
      console.log('this number', thisNumber);
      console.log('numeri azzeccati', safeNumbers);
    }
    // quando length array numeri azzeccati uguale a maxAttemps gioco finisce
    if (safeNumbers.length === numberOfAttempts) {
      // funzione gestione outcome gioco, esito vittoria
      gameOutcome('win', safeNumbers);
    }
    // gestione dei messaggi di fine partita
    // gameResult sarà 'win' in caso di vittoria
    // secondo attributo per calcolare quantità di numeri giusti indovinati
    function gameOutcome(gameResult, safeNumbers) {
      if (gameResult === 'win') {
        alert('Hai indovinato tutti i numeri! Hai vinto');
      } else if (gameResult === 'lost') {
        alert('Hai perso');
        alert('Totale di numeri indovinati: ' + safeNumbers.length);
      }
    }
  }
}

// ------------------------
// UTILITY FUNCTIONS
// ------------------------

// genera un array di x elementi con numeri casuali tra minRange e maxRange (inclusi)
// quantityOfBombs --> quantità elementi da creare
// minRange --> valore minimo del numero casuale
// maxRange --> valore massimo del numero casuale
function generateBombs(quantityOfBombs, minRange, maxRange) {
  // genero array per numeri casuali
  const randomNumbersArray = [];

  // genero elementi finchè array.length = quantityOfBombs
  while (randomNumbersArray.length < quantityOfBombs) {
    const randomNumber = getRndInteger(minRange, maxRange);
    // se il numero non è gia presente nell'array allora lo aggiungo
    if (!randomNumbersArray.includes(randomNumber)) {
      randomNumbersArray.push(randomNumber);
    }
  }
  return randomNumbersArray;
}

// generatore di numeri casuali tra min e max (inclusi)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
