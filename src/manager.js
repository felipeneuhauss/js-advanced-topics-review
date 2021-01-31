const EntityBase = require('./entity-base')
const Util = require('./util')
const Employee = require('./employee')

class Manager extends Employee {
  #bonuses = 2000

  get bonuses () {
    return Util.formatCurrency(this.#bonuses)
  }

  get netPay() {
    const finalValue =
      Util.unFormatCurrency(super.netPay) +
      Util.unFormatCurrency(this.bonuses)

    return Util.formatCurrency(finalValue)
  }

}

module.exports = Manager
