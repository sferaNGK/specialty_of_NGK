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
    if (dragElement.current !== null) {
        let item = dragElement.current.target
        let elemBelow = dropPlace.current

        if (elemBelow.className !== 'forCorrect' && elemBelow.parentElement.className !== 'forCorrect' && elemBelow.className !== 'forIncorrect' && elemBelow.parentElement.className !== 'forIncorrect') {
            document.querySelector('.items').appendChild(item)
            item.style.position = 'static'
            item.style.color = 'white'
        } else if (elemBelow.parentElement.className === 'forCorrect' || elemBelow.parentElement.className === 'forIncorrect') {
            elemBelow.parentElement.appendChild(item)
            item.style.position = 'static'
            if ((elemBelow.parentElement.className === 'forCorrect' && item.className === 'correct') || (elemBelow.parentElement.className === 'forIncorrect' && item.className === 'incorrect')) {
                item.style.color = 'green'
            } else {
                item.style.color = 'red'
            }
        } else {
            elemBelow.appendChild(item)
            item.style.position = 'static'
            if ((elemBelow.className === 'forCorrect' && item.className === 'correct') || (elemBelow.className === 'forIncorrect' && item.className === 'incorrect')) {
                item.style.color = 'green'
            } else {
                item.style.color = 'red'
            }
        }

        dragElement.current = null;
        dropPlace.current = null;

        if (document.querySelector('.forCorrect').children.length - 1 === document.querySelectorAll('.correct').length) {
            if (document.querySelector('.forIncorrect').children.length - 1 === document.querySelectorAll('.incorrect').length) {
                let correctCount = 0
                for (let item of document.querySelector('.forCorrect').children) {
                    if (item.className === 'correct') {
                        correctCount++
                    }
                }
                if (correctCount === document.querySelectorAll('.correct').length) {
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
    }
}

document.body.addEventListener('touchend', handleTouchEnd);