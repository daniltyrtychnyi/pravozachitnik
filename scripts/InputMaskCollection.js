import IMask from 'https://unpkg.com/imask@7.6.1/esm'

const rootSelector = '[data-js-input-imask]'

class InputMask {
    constructor(rootElement) {
        this.rootElement = rootElement
        this.init()
        this.bindEvents()
    }

    init() {
        this.mask = IMask(this.rootElement, {mask: '+{7}(000)000-00-00'})
    }

    onFormReset = () => {
        this.mask.updateValue()
    }

    bindEvents() {
        document.addEventListener('form:reset', this.onFormReset)
    }
}

class InputMaskCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((el) => {
            new InputMask(el)
        })
    }
}

export default InputMaskCollection