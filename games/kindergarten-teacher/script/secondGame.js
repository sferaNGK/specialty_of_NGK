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
        className: "card forIncorrect",
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
    {
        className: "card forCorrect",
        imgID: "trainHandSkills",
        imgURL: "img/trainHandSkills.png",
        posRight: "4%",
        posTop: "36%",
        textContent: "Развивает у детей моторику рук"
    },
    {
        className: "card forIncorrect",
        imgID: "giveHomework",
        imgURL: "img/giveHomework.png",
        posRight: "15%",
        posTop: "68%",
        textContent: "Задаёт домашнее задание"
    },
    {
        className: "card forCorrect",
        imgID: "walking",
        imgURL: "img/walking.png",
        posRight: "26%",
        posTop: "36%",
        textContent: "Гуляет с детьми на свежем воздухе"
    },
    {
        className: "card forIncorrect",
        imgID: "sadKid",
        imgURL: "img/sadKid.jpeg",
        posRight: "48%",
        posTop: "36%",
        textContent: "Игнорирует плохое настроение детей"
    },
    {
        className: "card forIncorrect",
        imgID: "setRating",
        imgURL: "img/setRating.png",
        posRight: "37%",
        posTop: "68%",
        textContent: "Ставит детям оценки"
    },
]

function createCard(element){ // --- СОЗДАНИЕ КАРТОЧЕК СО СВОЙСТВАМИ ОБЪЕКТОВ МАССИВА CARDS
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

for (let element of cards) { // --- ДОБАВЛЕНИЕ КАРТОЧЕК НА СТРАНИЦУ
    createCard(element)
}

const dragElement = { // --- ТЕКУЩАЯ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ
    current: null,
};

const dropPlace = {
    current: null,
};

let shiftX = null;
let shiftY = null;

for (let item of document.querySelector('.stickers').children) { // --- ВЕШАЕМ НА ПЕРЕТАСКИВАЕМЫЕ ОБЪЕКТЫ ОБРАБОТЧИК СОБЫТИЯ
    item.addEventListener('touchstart', handleTouchStart);
}

function handleTouchStart(event) {
    dragElement.current = event.targetTouches[0];
    document.body.addEventListener('touchmove', handleTouchMove);
    shiftX = dragElement.current.target.offsetWidth / 2;
    shiftY = dragElement.current.target.offsetHeight / 2;
}

function handleTouchMove(event) {
    if (dragElement.current !== null) { // --- ЕСЛИ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ ОПРЕДЕЛЕНА
        let item = dragElement.current.target

        document.body.appendChild(item)
        item.style.position = 'absolute'

        moveAt(item, event)

        // --- СКРЫВАЕМ ПЕРЕТАСКИВАЕМЫЙ ОБЪЕКТ, ЧТОБЫ ОПРЕДЕЛИТЬ НАХОДЯЩИЙСЯ ПОД НИМ БЛОК, И СНОВА ПОКАЗЫВАЕМ ---
        item.style.visibility = 'hidden';
        let elemBelow = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY);
        item.style.visibility = 'visible';

        dropPlace.current = elemBelow.parentElement;
    }
}

function moveAt(item, event) {
    // --- ЗАДАЕМ ЧЕРЕЗ СТИЛИ КООРДИНАТЫ НАШЕГО КУРСОРА (ПАЛЬЦА) НА ЭКРАНЕ ---
    item.style.left = (event.touches[0].pageX - shiftX)*100/document.documentElement.offsetWidth + '%';
    item.style.top = (event.touches[0].pageY - shiftY)*100/document.documentElement.offsetHeight + '%';

    // --- ПРОВЕРЯЕМ, НЕ ВЫХОДИТ ЛИ НАШ ОБЪЕКТ ЗА ГРАНИЦЫ ЭКРАНА ---
    if (event.touches[0].pageX < 40) {
        item.style.left = event.touches[0].pageX - shiftX + 170 + 'px';
    } else if (event.touches[0].pageX > window.screen.width - 50) {
        item.style.left = event.touches[0].pageX - shiftX - 170 + 'px';
    }
    if (event.touches[0].pageY < 40) {
        item.style.top = event.touches[0].pageY - shiftY + 170 + 'px';
    } else if (event.touches[0].pageY > window.screen.height - 50) {
        item.style.top = event.touches[0].pageY - shiftY - 170 + 'px';
    }
}

function handleTouchEnd() { // --- КОГДА УБИРАЕМ ПАЛЕЦ С ЭКРАНА ДОБАВЛЯЕМ СТИКЕР К КАРТОЧКЕ И ОТСЛЕЖИВАЕМ ПРАВИЛЬНОСТЬ ОТВЕТА
    if (dragElement.current !== null) {
        let item = dragElement.current.target
        let elemBelow = dropPlace.current

        if (elemBelow.className.split(' ')[0] === 'card' && elemBelow.getElementsByTagName('img').length < 1) {
            elemBelow.appendChild(item)
            item.style.top = '-5%'
            item.style.left = '-5%'
        } else {
            document.querySelector('.stickers').appendChild(item)
            item.style.position = 'static'
        }

        let correctCount = 0
        let incorrectCount = 0

        for (let item of document.querySelectorAll('.card')) {
            if (item.lastChild.className === 'correct' && item.className.split(' ')[1] === 'forCorrect') {
                correctCount++
            } else if (item.lastChild.className === 'incorrect' && item.className.split(' ')[1] === 'forIncorrect') {
                incorrectCount++
            }
        }

        dragElement.current = null
        dropPlace.current = null

        if (correctCount === document.querySelectorAll('.correct').length && incorrectCount === document.querySelectorAll('.incorrect').length) {
            setTimeout(() => {
                document.querySelector('.congratulation').style.display = 'grid'
                for (let i of document.body.children) {
                    if (i.className !== 'congratulation') {
                        i.style.display = 'none'
                    }
                }
                document.querySelector('body').style.backdropFilter = 'blur(5px)'
            }, 1000)
        }
    }
}

document.body.addEventListener('touchend', handleTouchEnd);