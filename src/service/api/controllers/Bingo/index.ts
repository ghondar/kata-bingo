interface Card {
  _id: number;
  fields: Array<Array<number>>;
}

class Bingo {
  cards: Array<Card> = []
  numbers: Array<number> = []
  limitColumns = 5
  totalField = 15
  min = 1
  max = 75

  generateRandomNumber() {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
  }

  generateColumns() {
    const columns = []

    for (let column = 0; column < this.limitColumns; column++)
      columns.push(Array(this.totalField).fill(0).map((_, index) => (index + 1) * (column + 1)))

    return columns
  }

  generateRandomNumberNotIncluded() {
    let number = this.generateRandomNumber()
    while (this.numbers.includes(number))
      number = this.generateRandomNumber()

    return number
  }

  generateNumber() {
    if(this.cards.length === 0)
      throw new Error('No participants found')
    if(this.numbers.length >= this.max)
      throw new Error('Numbers are full')

    const number = this.generateRandomNumberNotIncluded()
    this.numbers.push(number)

    return { number, numbers: this.numbers }
  }

  createBingoCard() {
    const card = {
      fields: this.generateColumns().map((column, index) => {
        const numbers = column.sort(() => 0.5 - Math.random()).slice(0, this.limitColumns) as Array<number | string>
        if(index === 2) numbers.splice(2, 1, 'FREE_SPACE')

        return column
      }),
      _id: this.cards.length + 1
    }

    this.cards.push(card)

    return { card }
  }

  validateCard(id: number) {
    const card = this.cards.find(card => card._id === Number(id))
    if(!card) throw new Error('Card not found')

    const numbersOfField = card.fields.flat().filter(Number)
    const winner = numbersOfField.every(this.numbers.includes)

    if(winner)
      return {
        winner
      }

    return {
      winner: false,
      need  : numbersOfField.filter(number => !this.numbers.includes(number))
    }
  }

  validateCards() {
    if(this.cards.length === 0)
      throw new Error('No participants found')

    return this.cards.map(({ _id }) => this.validateCard(_id))
  }
}

export default Bingo
