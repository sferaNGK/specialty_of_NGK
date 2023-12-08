const dragElement = { // --- ТЕКУЩАЯ ПЕРЕТАСКИВАЕМАЯ ЦЕЛЬ
    current: null,
};

const dropPlace = {
    current: null,
};

let shiftX = null;
let shiftY = null;

for (let item of document.querySelector('.items').children) { // --- ВЕШАЕМ НА ПЕРЕТАСКИВАЕМЫЕ ОБЪЕКТЫ ОБРАБОТЧИК СОБЫТИЯ
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

        if (elemBelow.className === 'left-drop-side' || elemBelow.className === 'right-drop-side') {
            dropPlace.current = elemBelow;
        }
    }
}

function moveAt(item, event) {
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
}

function handleTouchEnd() { // --- КОГДА УБИРАЕМ ПАЛЕЦ С ЭКРАНА - ТЕКУЩИЙ ПЕРЕМЕЩАЕМЫЙ ОБЪЕКТ ОБНУЛЯЕТСЯ
    let item = dragElement.current.target
    dropPlace.current.appendChild(item)
    item.style.position = 'static'
    if (dropPlace.current.className === 'left-drop-side' && item.className === 'correct' || dropPlace.current.className === 'right-drop-side' && item.className === 'incorrect') {
        item.style.color = 'green'
    } else {
        item.style.color = 'red'
    }

    dragElement.current = null;
    dropPlace.current = null;

    let correctCount = 0
    let incorrectCount = 0
    if (document.querySelector('.left-drop-side').children.length - 1 === document.querySelectorAll('.correct').length) {
        if (document.querySelector('.right-drop-side').children.length - 1 === document.querySelectorAll('.incorrect').length) {
            for (let item of document.querySelector('.left-drop-side').children) {
                if (item.className === ' correct') {
                    correctCount++
                }
            }
        }
    }
}

// setTimeout(() => {
//     document.querySelector('.congratulation').style.display = 'grid'
//     for (let i of document.body.children) {
//         if (i.className !== 'congratulation') {
//             i.style.display = 'none'
//         }
//     }
//     document.querySelector('body').style.backdropFilter = 'blur(5px)'
// }, 1000)

document.body.addEventListener('touchend', handleTouchEnd);