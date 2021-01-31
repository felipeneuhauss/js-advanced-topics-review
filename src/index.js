const assert = require('assert')

const Employee = require('./employee')
const Manager = require('./manager')
const Util = require('./util')

const GENDER = {
  male: 'male',
  female: 'female'
}

{
  const employee = new Employee({
    name: 'Xuxa',
    gender: GENDER.female
  })
  assert.throws(() => employee.birthYear, { message: 'you must define age first'})
}

const CURRENT_YEAR = 2021
Date.prototype.getFullYear = () => CURRENT_YEAR

{
  const employee = new Employee({
    name: 'Mussum',
    gender: GENDER.male,
    age: 70
  })
  assert.deepStrictEqual(employee.name, 'Mr. Mussum')
  assert.deepStrictEqual(employee.age, 70)
  assert.deepStrictEqual(employee.gender, GENDER.male)
  assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40))
  assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32))
  const expectedBirthYear = 1951
  assert.deepStrictEqual(employee.birthYear, expectedBirthYear)
}

{
  const manager = new Manager({
    name: 'Mariazinha',
    gender: GENDER.female,
    age: 18
  })
  assert.deepStrictEqual(manager.name, 'Ms. Mariazinha')
  assert.deepStrictEqual(manager.age, 18)
  assert.deepStrictEqual(manager.gender, GENDER.female)
  assert.deepStrictEqual(manager.birthYear, 2003)
  assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.40))
  assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000))
  assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32))
}
