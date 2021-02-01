const COUNTER = 'counter'
const RESTART = 'restart'
const COUNT = 100
const INTERVAL = 10

class CounterComponent {
  constructor() {
    this.initialize()
  }

  proxyCounterPrepare () {
    const handler = {
      set: (currentContext, propertyKey, newValue) => {
        console.log({currentContext, propertyKey, newValue})
        if (!currentContext.value) {
          currentContext.stop()
        }
        currentContext[propertyKey] = newValue
        return true
      }
    }

    const counter = new Proxy({
      value: COUNT,
      stop: () => {}
    }, handler)

    return counter
  }

  updateCounterValue = ({ counterElement, counter }) => () =>  {
    console.log(counter)
    const textCounterId = '$$counterId'
    const defaultText = `Começando em <strong>${textCounterId}</strong> segundos...`
    counterElement.innerHTML = defaultText.replace(textCounterId, counter.value--)
  }

  scheduleStop ({ counterElement, interval}) {
    return () => {
      clearInterval(interval)
      counterElement.innerHTML = ''
      this.disableButton()
    }
  }

  prepareButton (buttonElement, initializeFunction) {
    buttonElement.addEventListener('click', initializeFunction.bind(this))
    return (value = true) => {
      const attr = 'disabled'
      if (value) {
        buttonElement.setAttribute(attr, value)
        return
      }

      buttonElement.removeAttribute(attr)
    }
  }

  initialize () {
    console.log('Initialized')
    const counterElement = document.getElementById(COUNTER)
    const counter = this.proxyCounterPrepare()
    // counter.valor = 100
    // counter.valor = 90
    // counter.valor = 80
    const args = {
      counterElement,
      counter
    }
    const fn = this.updateCounterValue(args)
    const interval = setInterval(fn, INTERVAL)

    {
      const restartButton = document.getElementById(RESTART)
      const disableButton = this.prepareButton(restartButton, this.initialize)

      const args = { counterElement, interval }
      const scheduleCounterStop = this.scheduleStop.apply({ disableButton }, [args])
      counter.stop = scheduleCounterStop
    }
  }
}
