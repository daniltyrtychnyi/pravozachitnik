class CallbackModal {
    selectors = {
        root: '[data-js-callback-modal]',
        callbackButton: '[data-js-callback-modal-callback-button]',
        closeButton: '[data-js-callback-modal-close-button]',
        main: '[data-js-callback-modal-main]',
        form: '[data-js-callback-modal-form]',
        input: '[data-js-callback-modal-input]',
        submitButton: '[data-js-callback-modal-submit-button]',
        message: '[data-js-callback-modal-message]',
    }

    stateClasses = {
        isLock: 'is-lock',
        isVisible: 'is-visible',
    }

    stateButtonText = {
        default: 'Заказать звонок',
        submit: 'Отправка...',
    }

    submitDelay = 500

    successSubmitMessage = 'Спасибо! Мы свяжемся с вами в ближайшее время.'

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.callbackButtonElement = document.querySelector(this.selectors.callbackButton)
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton)
        this.mainElement = this.rootElement.querySelector(this.selectors.main)
        this.formElement = this.rootElement.querySelector(this.selectors.form)
        this.inputElements = this.rootElement.querySelectorAll(this.selectors.input)
        this.submitButtonElement = this.rootElement.querySelector(this.selectors.submitButton)
        this.messageElement = this.rootElement.querySelector(this.selectors.message)
        this.bindEvents()
    }

    open() {
        document.documentElement.classList.add(this.stateClasses.isLock)
        this.rootElement.showModal()
        this.inputElements[0].focus()
    }

    close() {
        this.rootElement.close()
    }

    modalReset() {
        this.mainElement.hidden = false
        this.messageElement.classList.remove(this.stateClasses.isVisible)
        this.messageElement.textContent = ''
        this.submitButtonElement.disabled = false
        this.submitButtonElement.textContent = this.stateButtonText.default
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
        this.submitButtonElement.textContent = this.stateButtonText.submit

        this.timeoutSubmit = setTimeout(() => {
            this.messageElement.classList.add(this.stateClasses.isVisible)
            this.messageElement.textContent = this.successSubmitMessage
            this.mainElement.hidden = true
            this.formReset()
        }, this.submitDelay)

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