const images = [
    {
        id: "carpet",
        src: "img/carpet.png",
        alt: "carpet",
        className: "drop-place",
        posLeft: "49%",
        posTop: "80%",

    },
    {
        id: "airplane",
        src: "img/airplane.png",
        alt: "airplane",
        className: "drag-item incorrect",
        posLeft: "39%",
        posTop: "80%",
    },
    {
        id: "car1",
        src: "img/car1.png",
        alt: "car1",
        className: "drag-item incorrect",
        posLeft: "13%",
        posTop: "86%",
    },
    {
        id: "car2",
        src: "img/car2.png",
        alt: "car2",
        className: "drag-item incorrect",
        posLeft: "9.5%",
        posTop: "44%",
    },
    {
        id: "gun1",
        src: "img/gun1.png",
        alt: "gun1",
        className: "drag-item incorrect inDropPlace",
        posLeft: "70%",
        posTop: "87%",
    },
    {
        id: "gun2",
        src: "img/gun2.png",
        alt: "gun2",
        className: "drag-item incorrect",
        posLeft: "78%",
        posTop: "84%",
    },
    {
        id: "lego",
        src: "img/lego.png",
        alt: "lego",
        className: "drag-item incorrect inDropPlace",
        posLeft: "55%",
        posTop: "85%",
    },
    {
        id: "kukla1",
        src: "img/kukla1.png",
        alt: "kukla1",
        className: "drag-item correct",
        posLeft: "91%",
        posTop: "75%",
    },
    {
        id: "kukla2",
        src: "img/kukla2.png",
        alt: "kukla2",
        className: "drag-item correct",
        posLeft: "47%",
        posTop: "49%",
    },
    {
        id: "kukla3",
        src: "img/kukla3.png",
        alt: "kukla3",
        className: "drag-item correct",
        posLeft: "65.5%",
        posTop: "50%",
    },
    {
        id: "instruments",
        src: "img/instruments.png",
        alt: "instruments",
        className: "drag-item incorrect",
        posLeft: "88%",
        posTop: "81%",
    },
    {
        id: "pram",
        src: "img/pram.png",
        alt: "pram",
        className: "drag-item correct",
        posLeft: "23%",
        posTop: "63%",
    },
    {
        id: "toysForKukla",
        src: "img/toysForKukla.png",
        alt: "toysForKukla",
        className: "drag-item correct",
        posLeft: "1%",
        posTop: "87%",
    },
    {
        id: "posuda",
        src: "img/posuda.png",
        alt: "posuda",
        className: "drag-item correct",
        posLeft: "25.5%",
        posTop: "85%",
    }
]

function createElement(element){
    const img = document.createElement("img")
    img.id = element.id
    img.src = element.src
    img.alt = element.alt
    img.className = element.className
    img.style.left = element.posLeft
    img.style.top = element.posTop
    document.body.appendChild(img)
}

for (let element of images) {
    createElement(element)
}

const currentElement = { // --- ТЕКУЩАЯ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ
    current: null,
};

let dropPlace = [];

let shiftX = null;
let shiftY = null;

for (let item of document.getElementsByClassName('drag-item')) { // --- ВЕШАЕМ НА ПЕРЕТАСКИВАЕМЫЕ ОБЪЕКТЫ ОБРАБОТЧИК СОБЫТИЯ
    item.addEventListener('touchstart', handleTouchStart);
    if (item.className.split(' ')[2] === 'inDropPlace') {
        dropPlace.push(item)
    }
}

function handleTouchStart(event) {
    currentElement.current = event.targetTouches[0];
    document.body.addEventListener('touchmove', handleTouchMove);
    shiftX = event.touches[0].pageX - this.getBoundingClientRect().left;
    shiftY = event.touches[0].pageY - this.getBoundingClientRect().top;
}

function handleTouchMove(event) {
    if (currentElement.current !== null) { // --- ЕСЛИ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ ОПРЕДЕЛЕНА
        let item = currentElement.current.target

        // --- ЗАДАЕМ ЧЕРЕЗ JS-АНИМАЦИЮ КООРДИНАТЫ НАШЕГО КУРСОРА (ПАЛЬЦА) НА ЭКРАНЕ ---
        window.requestAnimationFrame(() => {
            item.style.left = (event.touches[0].pageX - shiftX)*100/document.documentElement.clientWidth + '%';
            item.style.top = (event.touches[0].pageY - shiftY)*100/document.documentElement.clientHeight + '%';

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
        })

        // --- СКРЫВАЕМ ПЕРЕТАСКИВАЕМЫЙ ОБЪЕКТ, ЧТОБЫ ОПРЕДЕЛИТЬ НАХОДЯЩИЙСЯ ПОД НИМ БЛОК, И СНОВА ПОКАЗЫВАЕМ ---
        item.style.visibility = 'hidden';
        let elemBelow = document.elementFromPoint(item.getBoundingClientRect().left + item.offsetWidth / 2, item.getBoundingClientRect().bottom);
        item.style.visibility = 'visible';

        // --- ОТСЛЕЖИВАЕМ ЗАПОЛНЕННОСТЬ ОБЛАСТИ ДРОПА НУЖНЫМИ ОБЪЕКТАМИ ---
        let dropPlaceStatus = dropPlaceIsFull(elemBelow, item)

        if (dropPlaceStatus === true) {
            setTimeout(() => {
                document.querySelector('.congratulation').style.display = 'grid'
                for (let i of document.body.children) {
                    if (i.className !== 'congratulation') {
                        i.style.display = 'none'
                    }
                }
            }, 1000)
        }
    }
}

function dropPlaceIsFull(elemBelow, item) {
    if (elemBelow.className === 'drop-place' || elemBelow.className.split(' ')[2] === 'inDropPlace') {
        item.classList.add('inDropPlace')
        if (!dropPlace.includes(item)) {
            dropPlace.push(item)
        }
    } else {
        item.classList.remove('inDropPlace')
        dropPlace = dropPlace.filter(i => i !== item)
    }

    let correctElementsCount = 0
    if (dropPlace.length === document.getElementsByClassName('correct').length) {
        for (let item of dropPlace) {
            if (item.className.split(' ')[1] !== 'correct') {
                break
            } else {
                correctElementsCount++
            }
        }
        if (correctElementsCount === document.getElementsByClassName('correct').length) {
            return true
        }
    }
}

function handleTouchEnd() { // --- КОГДА УБИРАЕМ ПАЛЕЦ С ЭКРАНА - ТЕКУЩИЙ ПЕРЕМЕЩАЕМЫЙ ОБЪЕКТ ОБНУЛЯЕТСЯ
    currentElement.current = null;
}

document.body.addEventListener('touchend', handleTouchEnd);