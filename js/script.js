// Этим DOMContentLoaded мы говорим скрипту загружаться 
//только после полной прогрузки DOM дерева
window.addEventListener('DOMContentLoaded', function() { 

    'use strict';

    // Пишем табы. Для начала получим все необходимые элементы
    let tab = document.querySelectorAll('.info-header-tab'), //Получаем сами табы
        info = document.querySelector('.info-header'), //Получаем родителя табов
        tabContent = document.querySelectorAll('.info-tabcontent'); //Получаем блоки с контентом для табов

    function hideTabContent(a) { // функция, которая будет скрывать контент
        for(let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show'); // Удаляем из блока контента классы show
            tabContent[i].classList.add('hide'); // Добавляем в блоки контента классы hide
        }
    }

    hideTabContent(1); // Чтобы скрыть все блоки кроме первого, передаем функции 1 и цикл выше начнется с итератора 1

    function showTabContent(b) { //Функция, которая будет показывать контент табов
        if(tabContent[b].classList.contains('hide')) { //проверим, действительно ли скрыт выбранный элемент
            tabContent[b].classList.remove('hide'); // Удаляем из блока контента классы hide
            tabContent[b].classList.add('show'); // Добавляем в блоки контента классы show
        }
    }

    //Назначем обработчик событий на каждый из табов
    info.addEventListener('click', function(event) { //Объект event нам нужен для сравнения с тем куда мы кликаем
        let target = event.target; //В target попадет то куда мы кликнули

        if(target && target.classList.contains('info-header-tab')) { //Проверяем, если мы кликнули по табу то
            for(let i = 0; i < tab.length; i++) { //перебираем табы в цикле
                if(target == tab[i]) {  //проверяем если то куда кликнули совпадает с текущим табом, что перебирается в цикле, то
                    hideTabContent(0); //вызовем функцию скрывающую ненужные блоки контента и начнем перебор с нулевого элемента
                    showTabContent(i); //Покажем таб совпадающий по итератору
                    break; //Остановим цикл
                }
            }
        }
    });

    //Timer
    let deadline = '2020-01-26'; //Дата когда закончится отсчет таймера

    function getTimeRemaining(endtime) { // Функция будет определять значение, лежащее между настоящим временем и датой конца отсчета
        // Data.parse() преобразует полученную дату в количество милисекунд, прошедшее с 1975 г
        // Data.parse(endtime) - дата окончания отсчета таймера
        // Data.parse(new Data()) - текущая дата, которую получаем при помощи new Data()
        let t = Date.parse(endtime) - Date.parse(new Date()),
        // Получаем кол-во секунд из имеющихся миллисекундю С помощью Math.floor() округляем значение
        // Чтобы из миллисекунд получить секунды, нужно милисекунды разделить на 1000
        // Произведя действие t / 1000 мы получим всего секунд, а нам нужно получить именно остаток от минуты
        // Чтобы это сделать найдем остаток от деления t / 1000 на 60
            seconds = Math.floor((t / 1000) % 60),
        // Теперь получим минуты. Этим t / 1000 получаем кол-во секунд. Разделив t / 1000 на 60 получаем общее кол-во минут
        // Но нам снова нужен остаток минут от часа. Для этого вычисляем отсток от деления на 60
            minuts = Math.floor((t / 1000 / 60) % 60),
        // Найдем кол-во часов. Это 1000 * 60 * 60 тоже, что если бы мы последовательно делили каждый раз на 60
        // если бы в таймере были еще и дни то рассчет был бы такой
        // hours = Math.flour((t / 1000 / 60 / 60) % 24); так нашли бы остаток часов от дней
        // days = Math.flour((t / 1000 * 60 * 60 * 24)); так бы нашли дни
            hours = Math.floor((t / (1000 * 60 * 60)));

        //В этой функции мы получили сразу несколько значений seconds, minuts, hours
        // Но получить одновременно несколько значений из функции нельзя
        // Поэтому создадим объект
        
        return {
            'total' : t, // понадобится нам для остановки таймера
            'hourse' : hours,
            'minuts' : minuts,
            'seconds' : seconds
        }
    }

    // Напишем функцию для динамической подстановки вычисленных значений в таймер
    // В функцию будем передавать два параметра
    // id - это id элемента в который мы передаем секунды, минуты, часы
    // endtime - это конец отсчета
    function setClock(id, endtime) {
        let timer = document.getElementById(id), // Получаем наш блок с id timer
            hourse = timer.querySelector('.hours'), // Получаем из элемента timer элемент с классом .hourse
            minuts = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // Напишем функцию, которая будет обновлять наши часы каждую секунду
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if(num <= 9) {
                    return '0' + num;
                } else {
                    return num;
                }
            }
            
            hourse.textContent = addZero(t.hourse);
            minuts.textContent = addZero(t.minuts);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
                hourse.textContent = '00';
                minuts.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    // Модальное окно
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptBtn = document.querySelectorAll('.description-btn');

    descriptBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            overlay.style.display = 'block';
        });
    });

      
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash'); // Подключили анимацию, обратившись к кнопке через this
        document.body.style.overflow = 'hidden'; //Запрещаем прокрутку страницы когда открыто модальное окно
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = ''; // Разрешаем прокрутку страницы после закрытия модального окна
    });



});