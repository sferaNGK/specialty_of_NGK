const cards = [
    {
        className: "card forCorrect",
        imgID: "helpGetDress",
        imgURL: "img/helpsToGetDressed.png",
        posRight: "48%",
        posTop: "4%",
        textContent: "Помогает одеваться"
    },
    {
        className: "card forCorrect",
        imgID: "scolds",
        imgURL: "img/scolds.png",
        posRight: "26%",
        posTop: "4%",
        textContent: "Кричит и ругает"
    },
    {
        className: "card forCorrect",
        imgID: "drawing",
        imgURL: "img/drawing.png",
        posRight: "4%",
        posTop: "4%",
        textContent: "Рисует вместе с детьми"
    },
]

function createCard(element){
    const card = document.createElement("div")
    card.className = element.className
    card.style.right = element.posRight
    card.style.top = element.posTop
    document.body.appendChild(card)
    const cardImg = document.createElement("div")
    cardImg.id = element.imgID
    cardImg.className = "cardImg"
    cardImg.style.backgroundImage = `url(${element.imgURL}`
    card.appendChild(cardImg)
    const description = document.createElement("p")
    description.textContent = element.textContent
    card.appendChild(description)
}

for (let element of cards) {
    createCard(element)
}

