    class Menu {
        constructor(domNode) {
            this.menu = domNode;
            this.menuButton = this.menu.querySelector('.nav__button');
            this.menuButton.addEventListener('click', this.toggle.bind(this));
        }

        toggle() {
            //console.log(this);
            return this.menu.classList.toggle('nav--open');
        }
    }

    document.querySelectorAll('.nav').forEach(item => {
        new Menu(item);
    });
