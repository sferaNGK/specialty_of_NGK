const currentElement = { // --- ТЕКУЩАЯ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ
    current: null,
};

let shiftX = null;
let shiftY = null;

for (let item of document.querySelector('.items').children) { // --- ВЕШАЕМ НА ПЕРЕТАСКИВАЕМЫЕ ОБЪЕКТЫ ОБРАБОТЧИК СОБЫТИЯ
    item.addEventListener('touchstart', handleTouchStart);
}

function handleTouchStart(event) {
    currentElement.current = event.targetTouches[0];
    document.body.addEventListener('touchmove', handleTouchMove);
    shiftX = currentElement.current.target.offsetWidth / 2;
    shiftY = currentElement.current.target.offsetHeight / 2;
}

function handleTouchMove(event) {
    event.preventDefault()
    if (currentElement.current !== null) { // --- ЕСЛИ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ ОПРЕДЕЛЕНА
        let item = currentElement.current.target

        document.body.appendChild(item)
        item.style.position = 'absolute'

        // --- ЗАДАЕМ ЧЕРЕЗ JS-АНИМАЦИЮ КООРДИНАТЫ НАШЕГО КУРСОРА (ПАЛЬЦА) НА ЭКРАНЕ ---
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

        // --- СКРЫВАЕМ ПЕРЕТАСКИВАЕМЫЙ ОБЪЕКТ, ЧТОБЫ ОПРЕДЕЛИТЬ НАХОДЯЩИЙСЯ ПОД НИМ БЛОК, И СНОВА ПОКАЗЫВАЕМ ---
        item.style.visibility = 'hidden';
        let elemBelow = document.elementFromPoint(item.getBoundingClientRect().left + item.offsetWidth / 2, item.getBoundingClientRect().bottom);
        item.style.visibility = 'visible';

        // --- ОТСЛЕЖИВАЕМ ЗАПОЛНЕННОСТЬ МЕШКА И ЁЛКИ НУЖНЫМИ ОБЪЕКТАМИ ---
        //let dropPlaceStatus = dropPlaceIsFull(elemBelow, item)

        // if (dropPlaceStatus === true) {
        //     setTimeout(() => {
        //         document.querySelector('.congratulation').style.display = 'grid'
        //         for (let i of document.body.children) {
        //             if (i.className !== 'congratulation') {
        //                 i.style.display = 'none'
        //             }
        //         }
        //         document.querySelector('body').style.backdropFilter = 'blur(5px)'
        //     }, 1000)
        // }
    }
}

function handleTouchEnd() { // --- КОГДА УБИРАЕМ ПАЛЕЦ С ЭКРАНА - ТЕКУЩИЙ ПЕРЕМЕЩАЕМЫЙ ОБЪЕКТ ОБНУЛЯЕТСЯ
    currentElement.current = null;
}

document.body.addEventListener('touchend', handleTouchEnd);