const clothes = [
    {
        id: "sweater",
        className: "clothes",
        imgURL: "img/sweater.png",
        posTop: "42.2%",
        posLeft: "42.6%",
        widthOnChild: "26.7vh",
        baseWidth: "10vh"
    }
]

function createElement(element){ // --- СОЗДАНИЕ КАРТОЧЕК СО СВОЙСТВАМИ ОБЪЕКТОВ МАССИВА CARDS
    const img = document.createElement("img")
    img.id = element.id
    img.className = element.className
    img.src = element.imgURL
    img.style.left = element.posLeft
    img.style.top = element.posTop
    img.style.width = element.baseWidth
    document.querySelector('.clothes').appendChild(img)
}

for (let element of clothes) { // --- ДОБАВЛЕНИЕ КАРТОЧЕК НА СТРАНИЦУ
    createElement(element)
}