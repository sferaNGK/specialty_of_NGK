const clothes = [
    {
        id: "0",
        className: "clothes-item",
        imgURL: "img/sweater.png",
        posTop: "30%",
        posLeft: "5.05%",
        widthOnChild: "26.7vh",
        baseWidth: "18vh",
        zIndex: "0"
    },
    {
        id: "1",
        className: "clothes-item",
        imgURL: "img/skarf.png",
        posTop: "31%",
        posLeft: "21%",
        widthOnChild: "17vh",
        baseWidth: "18vh",
        zIndex: "0"
    },
    {
        id: "2",
        className: "clothes-item",
        imgURL: "img/leftGlove.png",
        posTop: "56%",
        posLeft: "0%",
        widthOnChild: "8.2vh",
        baseWidth: "18vh",
        zIndex: "0"
    },
    {
        id: "3",
        className: "clothes-item",
        imgURL: "img/rightGlove.png",
        posTop: "57%",
        posLeft: "75.3%",
        widthOnChild: "7vh",
        baseWidth: "18vh",
        zIndex: "0"
    },
    {
        id: "4",
        className: "clothes-item",
        imgURL: "img/redHat.png",
        posTop: "-7%",
        posLeft: "10%",
        widthOnChild: "25vh",
        baseWidth: "19vh",
        zIndex: "0"
    },
    {
        id: "5",
        className: "clothes-item",
        imgURL: "img/leftSock.png",
        posTop: "81%",
        posLeft: "28%",
        widthOnChild: "8.5vh",
        baseWidth: "16vh",
        zIndex: "0"
    },
    {
        id: "6",
        className: "clothes-item",
        imgURL: "img/rightSock.png",
        posTop: "81%",
        posLeft: "47%",
        widthOnChild: "10vh",
        baseWidth: "16vh",
        zIndex: "0"
    },
    {
        id: "7",
        className: "clothes-item",
        imgURL: "img/sweatPants.png",
        posTop: "59%",
        posLeft: "22%",
        widthOnChild: "19vh",
        baseWidth: "16vh",
        zIndex: "1"
    },
    {
        id: "8",
        className: "clothes-item",
        imgURL: "img/leftShoe.png",
        posTop: "82%",
        posLeft: "30%",
        widthOnChild: "8vh",
        baseWidth: "18vh",
        zIndex: "0"
    },
    {
        id: "9",
        className: "clothes-item",
        imgURL: "img/rightShoe.png",
        posTop: "82%",
        posLeft: "47.5%",
        widthOnChild: "10vh",
        baseWidth: "16vh",
        zIndex: "0"
    },
]

function createElement(element){ // --- СОЗДАНИЕ КАРТОЧЕК СО СВОЙСТВАМИ ОБЪЕКТОВ МАССИВА CARDS
    const img = document.createElement("img")
    img.id = element.id;
    img.className = element.className;
    img.src = element.imgURL;
    img.style.left = element.posLeft;
    img.style.top = element.posTop;
    img.style.width = element.baseWidth;
    img.style.zIndex = element.zIndex
    img.addEventListener('touchstart', handleTouchStart);
    document.querySelector('.clothes').appendChild(img);
}

createElement(clothes[0]);

const dragElement = { // --- ТЕКУЩАЯ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ
    current: null,
};

const dropPlace = {
    current: null,
};

let shiftX = null;
let shiftY = null;

function handleTouchStart(event) {
    dragElement.current = event.targetTouches[0];
    document.body.addEventListener('touchmove', handleTouchMove);
    shiftX = dragElement.current.target.offsetWidth / 2;
    shiftY = dragElement.current.target.offsetHeight / 2;
}

function handleTouchMove(event) {
    if (dragElement.current !== null) { // --- ЕСЛИ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ ОПРЕДЕЛЕНА
        let item = dragElement.current.target;

        document.body.appendChild(item);
        item.style.position = 'absolute';

        moveAt(item, event);

        // --- СКРЫВАЕМ ПЕРЕТАСКИВАЕМЫЙ ОБЪЕКТ, ЧТОБЫ ОПРЕДЕЛИТЬ НАХОДЯЩИЙСЯ ПОД НИМ БЛОК, И СНОВА ПОКАЗЫВАЕМ ---
        item.style.visibility = 'hidden';
        let elemBelow = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY);
        item.style.visibility = 'visible';

        dropPlace.current = elemBelow;
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

function handleTouchEnd() { // --- КОГДА УБИРАЕМ ПАЛЕЦ С ЭКРАНА - ТЕКУЩИЙ ПЕРЕМЕЩАЕМЫЙ ОБЪЕКТ ОБНУЛЯЕТСЯ
    let elemBelow = null;
    if (dropPlace.current.className === 'kid') {
        elemBelow = dropPlace.current
    } else if (dropPlace.current.parentElement.className === 'kid') {
        elemBelow = dropPlace.current.parentElement
    }

    if (dragElement.current !== null && elemBelow !== null) {
        let item = dragElement.current.target;

        elemBelow.appendChild(item)
        item.style.left = clothes[item.id].posLeft
        item.style.top = clothes[item.id].posTop
        item.style.width = clothes[item.id].widthOnChild
        item.removeEventListener("touchstart", handleTouchStart)

        if (item.id < clothes.length-1) {
            createElement(clothes[+item.id + 1])
        }

        dragElement.current = null;

        if (document.querySelector('.kid').children.length === clothes.length) {
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