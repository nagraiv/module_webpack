    // начальное и конечное положение контейнера-слайдера определяется свойством margin-left
    // текущее перемещение происходит через transform: translateX() для плавности

    const container = document.querySelector('.container__slider');
    // запоминаем ширину контейнера, чтобы ограничить горизонтальный скролл
    const containerWidth = container.scrollWidth;

    let isDragged = false;

    let styleObj;   //сущность для считывания стилей передвигаемого контейнера
    let marginLeft; //начальный сдвиг контейнера
    let startX;     //положение указателя в момент начала перемещения
    let translateX; //текущее смещение указателя относительно начального положения = смещение контейнера

    const scrollXHandler = function (event) {
        // console.log("It works!");
        // console.log(event.clientX - startX);
        translateX = event.clientX - startX;
        container.style.transform = `translateX(${translateX}px)`;
    };

    container.addEventListener('pointerdown', function (e) {
        e.preventDefault();

        startX = e.clientX;
        styleObj = window.getComputedStyle(container, null);
        marginLeft = parseInt(styleObj.marginLeft);
        // console.log("Starting margin-left", marginLeft);

        if (!isDragged) {
            isDragged = true;
            // console.log("Dragging starts!");
            window.addEventListener('pointermove', scrollXHandler);
        } else {
            // console.log("Another touch");
        }
    });

    window.addEventListener('pointerup', function () {
        if (isDragged) {
            isDragged = false;
            // console.log("Droped!");
            // marginLeft += translateX;
            // console.log("New marginLeft: ", marginLeft);

            let newMargin = marginLeft + translateX;
            if (newMargin > window.innerWidth - 100) {
                newMargin = window.innerWidth - 100;
            }
            if (newMargin < 100 - containerWidth) {
                newMargin = 100 - containerWidth;
            }
            // container.style.marginLeft = marginLeft + translateX + "px";
            container.style.marginLeft = newMargin + "px";
            container.style.transform = null;
            window.removeEventListener('pointermove', scrollXHandler);
        } else {
            // console.log("Another touch released");
        }
    });
