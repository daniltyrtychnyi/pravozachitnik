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

    onBurgerButtonClick = () => {
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)

        const isActive = this.burgerButtonElement.classList.contains(this.stateClasses.isActive)

        this.burgerButtonElement.ariaExpanded = isActive
        this.burgerButtonElement.ariaLabel = isActive ? this.labels.close : this.labels.open
        this.burgerButtonElement.title = isActive ? this.labels.close : this.labels.open

        this.dialogElement.open = !this.dialogElement.open
        document.documentElement.classList.toggle(this.stateClasses.isLock)
    }

    onLinkClick = (event) => {
        const isLinkClick = event.target.closest(this.selectors.link)

        if (!isLinkClick) {
            return
        }

        this.burgerButtonElement.classList.remove(this.stateClasses.isActive)
        this.burgerButtonElement.ariaExpanded = false
        this.burgerButtonElement.ariaLabel = this.labels.open
        this.burgerButtonElement.title = this.labels.open

        this.dialogElement.open = false
        document.documentElement.classList.remove(this.stateClasses.isLock)
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
        this.dialogElement.addEventListener('click', this.onLinkClick)
    }
}

export default OverlayMenu