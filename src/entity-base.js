class EntityBase {
  #name
  #age
  #gender
  constructor({name, age, gender}) {
    this.#name = name
    this.#age = age
    this.#gender = gender
  }

  get name() {
    const prefix = (this.#gender === 'male') ? 'Mr.' :  'Ms.'
    return `${prefix} ${this.#name}`
  }

  set age(value) {
    this.#age = value
  }

  get age() {
    return this.#age;
  }

  get gender() {
    return this.#gender;
  }

  get birthYear() {
    if (!this.#age) {
      throw new Error('you must define age first')
    }

    return new Date().getFullYear() - this.#age
  }
}

module.exports = EntityBase
