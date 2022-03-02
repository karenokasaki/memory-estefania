
//construção do deck
let imgs = [
    [1, "../img/amigos.svg"],
    [2, "../img/projetar.svg"],
    [3, "../img/poder.svg"],
    [4, "../img/harmonia.svg"],
    [5, "../img/caminho.svg"],
    [6, "../img/criar.svg"],
    [7, "../img/equipe.svg"],
    [8, "../img/refletir.svg"],
    [9, "../img/desafio.svg"],
    [10, "../img/verdade.svg"],
    [11, "../img/fe.svg"],
    [12, "../img/conectar.svg"],

]
let cardImgBack = ["../img/back.svg"]
let deck = [...imgs, ...imgs]

//criação das variáveis
let newLife
let selecionadas = []

// selecionando os elementos
let lifes = document.getElementById("lifes")
let game = document.getElementsByClassName("back-card")
let board = document.getElementById("board")
let showWin = document.getElementById("win")
let showLoose = document.getElementById("loose")

function flipCard() {
    let cardImg = this.nextElementSibling
    let cardSource = cardImg.src
    let cardBack = this

    //se for a primeira carta
    if (selecionadas.length === 0) {
        selecionadas.push(cardSource)
        flip()
        cardImg.classList.toggle("first-card")

        console.log("virando a primeira carta")
        return
    }

    //se for o segundo click
    if (selecionadas.length === 1) { //segunda carta selecionada, fazer o match
        selecionadas.push(cardSource)

        flip()
        checkMatch()


        console.log("virando a segunda carta")
        return
    }

    //se acontecer um terceiro click, não fazer nada
    if (selecionadas.length === 2) {
        console.log("tereira carta, não mostrar")

    } // só deixa virar duas cartas por vez

    function checkMatch() {
        if (selecionadas[0] === selecionadas[1]) {//se for iguais
            removeClick()                               //remove o evento click
            reset()                                     //reseta selecionadas
            checkWin()                                 //checa se o jogo está ganho

            let firstCardFliped = document.querySelector(".first-card")
            firstCardFliped.classList.toggle("first-card")


        } else {//se for diferente
            reset()                                     //reseta selecionadas
            updateLife()                                //tira uma vida
            checkLose()                                 //checa se o jogo está perdido
            setTimeout(flip, 700);                     //em 1 segundo, fechar a segunda carta
            setTimeout(updateFirstCard, 700);          //desvira a primeira carta


            // função que tira uma vida
            function updateLife() {
                newLife = Number(lifes.innerText) - 1
                lifes.innerText = newLife
            }

            // função que desvira a primeira carta
            function updateFirstCard() {
                let firstCardFliped = document.querySelector(".first-card")
                let backCard = firstCardFliped.previousSibling

                firstCardFliped.classList.toggle("first-card")
                firstCardFliped.classList.toggle("card-show")
                firstCardFliped.classList.toggle("card-no-show")
                backCard.classList.toggle("back-card")
                backCard.classList.toggle("card-no-show")
            }
        }
        return
    }

    function flip() {                       //vira e desvira a carta
        cardBack.classList.toggle("back-card")
        cardBack.classList.toggle("card-no-show")
        cardImg.classList.toggle("card-show")
        cardImg.classList.toggle("card-no-show")
    }

    function reset() {                      //limpa a lista de cartas clicadas
        selecionadas = []
    }

    function checkWin() {                   // checar o estado de win-loose
        setTimeout(() => {                  // 1 segundo para aparecer a tela de win
            if (game.length === 0) {                //se todas as cartas estão viradas -> win
                board.style.display = "none"
                showWin.style.display = "grid"
            }
        }, 500);

    }
    function checkLose() {
        setTimeout(() => {                  // 1 segundo para aparecer a tela de lose
            if (newLife === 0) {                // se as vidas chegaram a zero -> loose
                board.style.display = "none"
                showLoose.style.display = "grid"
            }
        }, 500);

    }

}
//criar as vidas
function setLifes() {
    lifesNumer = 20
    lifes.innerText = lifesNumer
    return lifesNumer
}
setLifes()

// função para embaralhar o deck
function shuffleCards() {
    deckSuffled = deck.sort(() => Math.random() - 0.5)
    return deckSuffled
}
shuffleCards()

//printar as cards no html
function printCards() {
    for (let i = 0; i < 24; i++) {
        let div = document.createElement("div")
        let cardBack = document.createElement("img")
        let cardFront = document.createElement("img")

        cardBack.classList.add("back-card")
        cardFront.classList.add("card-no-show")

        cardFront.id = ("card" + [i])
        cardFront.src = deckSuffled[i][1]
        cardBack.src = cardImgBack[0]

        div.appendChild(cardBack)
        div.appendChild(cardFront)
        board.appendChild(div)


    }
}
printCards()


//adicionar os eventos de clicks em cada carta
function eventClick() {
    let cards = document.querySelectorAll(".back-card")
    cards.forEach(card => {
        card.addEventListener("click", flipCard)
    });

    return cards
}
eventClick()

//remover os evento clicks
function removeClick() {
    removeEventListener("click", flipCard)
}
removeClick()



