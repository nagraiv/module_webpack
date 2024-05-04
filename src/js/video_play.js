    const container = document.querySelector('.container__video');
    const playBtn = container.querySelector('.video__preview');
    // Для мобильных и ПК разные видео
    const videoDesktop = container.querySelector('.video__desktop')
    const videoMobile = container.querySelector('.video__mobile')
    // При изменении размера вьюпорта (например, поменялась ориентация экрана)
    // лишнее видео в css получает свойство display: none, что обнуляет его размеры
    window.onresize = function() {
        if (videoDesktop.clientWidth === 0) {
            videoDesktop.pause();
        }
        if (videoMobile.clientWidth === 0) {
            videoMobile.pause();
        }
        if (videoDesktop.paused && videoMobile.paused) {
            playBtn.classList.remove('none');
        }
    }
    // оба видео размещены в одном контейнере, на клик должно реагировать только видео нужного размера
    container.addEventListener('click', function () {
        if (videoMobile.clientWidth !== 0) {
            if (videoMobile.paused) {
                videoMobile.play();
                playBtn.classList.add('none');
            } else {
                videoMobile.pause();
                playBtn.classList.remove('none');
            }
        }
        if (videoDesktop.clientWidth !== 0) {
            if (videoDesktop.paused) {
                videoDesktop.play();
                playBtn.classList.add('none');
            } else {
                videoDesktop.pause();
                playBtn.classList.remove('none');
            }
        }
    });
