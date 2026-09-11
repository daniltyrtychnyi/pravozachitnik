class OverlayMenu {
    selectors = {
        root: '[data-js-overlay-menu]',
        dialog: '[data-js-overlay-menu-dialog]',
        link: '[data-js-overlay-menu-link]',
        burgerButton: '[data-js-overlay-menu-burger-button]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    labels = {
        open: 'Открыть меню',
        close: 'Закрыть меню',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.dialogElement = this.rootElement.querySelector(this.selectors.dialog)
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)
        this.bindEvents()
    }

    open() {
        this.burgerButtonElement.classList.add(this.stateClasses.isActive)
        this.burgerButtonElement.ariaExpanded = true
        this.burgerButtonElement.ariaLabel = this.labels.close
        this.burgerButtonElement.title = this.labels.close
        this.dialogElement.open = true
        document.documentElement.classList.add(this.stateClasses.isLock)
    }

    close() {
        this.burgerButtonElement.classList.remove(this.stateClasses.isActive)
        this.burgerButtonElement.ariaExpanded = false
        this.burgerButtonElement.ariaLabel = this.labels.open
        this.burgerButtonElement.title = this.labels.open
        this.dialogElement.open = false
        document.documentElement.classList.remove(this.stateClasses.isLock)
    }

    onBurgerButtonClick = () => {
        this.dialogElement.open ? this.close() : this.open()
    }

    onClick = (event) => {
        const isLink = event.target.closest(this.selectors.link)

        if (!isLink) {
            return
        }

        this.close()
    }

    onMatchMediaChange = (event) => {
        if (!event.matches) {
            this.close()
        }
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
        this.dialogElement.addEventListener('click', this.onClick)
        window.matchMedia('(width <= 1024px)').addEventListener('change', this.onMatchMediaChange)
    }
}

export default OverlayMenu