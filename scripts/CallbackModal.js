class CallbackModal {
    selectors = {
        root: '[data-js-callback-modal]',
        callbackButton: '[data-js-callback-modal-callback-button]',
        closeButton: '[data-js-callback-modal-close-button]',
        main: '[data-js-callback-modal-main]',
        form: '[data-js-callback-modal-form]',
        submitButton: '[data-js-callback-modal-submit-button]',
        message: '[data-js-callback-modal-message]',
    }

    stateClasses = {
        isLock: 'is-lock',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.callbackButtonElement = document.querySelector(this.selectors.callbackButton)
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton)
        this.mainElement = this.rootElement.querySelector(this.selectors.main)
        this.formElement = this.rootElement.querySelector(this.selectors.form)
        this.submitButtonElement = this.rootElement.querySelector(this.selectors.submitButton)
        this.messageElement = this.rootElement.querySelector(this.selectors.message)
        this.bindEvents()
    }

    open() {
        document.documentElement.classList.add(this.stateClasses.isLock)
        this.rootElement.showModal()
    }

    close() {
        this.rootElement.close()
    }

    modalReset() {
        this.submitButtonElement.disabled = false
        this.submitButtonElement.textContent = 'Заказать звонок'
        this.messageElement.hidden = true
        this.mainElement.hidden = false
    }

    formReset() {
        this.formElement.reset()
        this.formElement.dispatchEvent(new Event('form:reset', {bubbles: true}))
    }

    onCallbackButtonClick = () => {
        this.open()
    }

    onCloseButtonClick = () => {
        this.close()
    }

    onOutsideClick = (event) => {
        const isModalElement = event.target === this.rootElement

        if (isModalElement) {
            this.close()
        }
    }

    onModalClose = () => {
        document.documentElement.classList.remove(this.stateClasses.isLock)
        clearTimeout(this.timeoutSubmit)
        this.modalReset()
        this.formReset()
    }

    onFormSubmit = (event) => {
        event.preventDefault()

        this.submitButtonElement.disabled = true
        this.submitButtonElement.textContent = 'Отправка...'

        this.timeoutSubmit = setTimeout(() => {
            this.formReset()
            this.messageElement.hidden = false
            this.mainElement.hidden = true
        }, 1000)

    }

    bindEvents() {
        this.callbackButtonElement.addEventListener('click', this.onCallbackButtonClick)
        this.closeButtonElement.addEventListener('click', this.onCloseButtonClick)
        document.addEventListener('click', this.onOutsideClick)
        this.rootElement.addEventListener('close', this.onModalClose)
        this.formElement.addEventListener('submit', this.onFormSubmit)
    }
}

export default CallbackModal