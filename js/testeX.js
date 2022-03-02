class lvl1 {
    constructor() {
        this.cards
        this.deck
        this.lifes
        this.board

        this.cards = [
            [1, "../img/amigos.svg"],
            [2, "../img/projetar.svg"],
            [3, "../img/poder.svg"],
            [4, "../img/harmonia.svg"],
        ]
        this.deck = [...this.cards, ...this.cards];

        this.cardBack = [ 
            ["../img/back.svg"]
        ]
    } 

    shuffleCards() {
        let deck = this.deck.sort(() => Math.random() - 0.5)
        return deck
    }



    printCards() {
        let board = document.getElementById("board")
        for (let i = 0; i < 8; i++) {
            let div = document.createElement("div")
            let cardBack = document.createElement("img")
            let cardFront = document.createElement("img")

            cardBack.classList.add("back-card")
            cardFront.classList.add("card-no-show")

            cardFront.id = ("card"+[i])
            cardFront.src = this.deck[i][1]
            cardBack.src = this.cardBack[0]

            div.appendChild(cardBack)
            div.appendChild(cardFront)
            board.appendChild(div)
        }
    } 

/*     setLifes() {
        this.lifes = 3
        let lifes = document.getElementById("lifes")
        lifes.innerText = this.lifes
    } */

    flipCard() { //essa função está estruturada direito? eu acho que juntei muita coisa em um lugar só
        
        let cardsToMatch = []
        let matchCards = []
        
        for (let i = 1 ; i <= 8 ; i++) {
            let cartaBack = `#board > div:nth-child(${i}) > img.back-card`
            let cartaSelector = document.querySelector(cartaBack)
            
            
            let cardNumberId = `card${i-1}`
            let cardFrontID = document.getElementById(cardNumberId)
            
        
            cartaSelector.addEventListener("click", () => { //abrir e fechar carta
                cardsToMatch.push(cardFrontID.src)
                cartaSelector.classList.add("card-no-show")
                cartaSelector.classList.remove("back-card")
                cardFrontID.classList.add("card-show")
                cardFrontID.classList.remove("card-no-show")
                console.log(cardsToMatch)
                console.log(matchCards)
                
                if (cardsToMatch.length <= 2 && cardsToMatch[0] !== cardsToMatch[1]) {
                    console.log("diferentes")
                    event()
                } else {
                    console.log("iguais")
                    matchCards.push(cardsToMatch[0], cardsToMatch[1])
                    cardsToMatch = []
                    console.log(matchCards)
                }
                
                
            })
            

            function event() {
            if (!matchCards.includes(cardFrontID)){
                cardFrontID.addEventListener("click", () => {
                    cartaSelector.classList.remove("card-no-show")
                    cartaSelector.classList.add("back-card")
                    cardFrontID.classList.remove("card-show")
                    cardFrontID.classList.add("card-no-show")
                    cardsToMatch = []

                })
            }
        }

            

            
        }
            
        
    }
        
    
}

    




  




newGame = new lvl1()

newGame.shuffleCards()
newGame.setLifes()
newGame.printCards()

newGame.flipCard()













