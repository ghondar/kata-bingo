import express, { Request, Response, NextFunction } from 'express'

import Bingo from '../../controllers/Bingo'
import Message from '../../utils/Message'

const router = express.Router()

const message = new Message()

let bingo: Bingo

const validateBingo = (req: Request, res: Response, next: NextFunction) => {
  if(bingo)
    next()
  else
    res.status(500).json(message.error('Bingo has not started'))
}

router.get('/start', (req, res) => {
  try {
    bingo = new Bingo()

    res.json(message.success('Bingo started'))
  } catch (err: any) {
    res.status(500)
    res.json(message.error(err.message))
  }
})

router.get('/generate-number', validateBingo, (req, res) => {
  try {
    const data = bingo.generateNumber()
    res.json(message.sendData(data))
  } catch (err: any) {
    res.status(500)
    res.json(message.error(err.message))
  }
})

router.get('/create/bingo-card', validateBingo, (req, res) => {
  try {
    const data = bingo.createBingoCard()
    res.json(message.sendData(data))
  } catch (err: any) {
    res.status(500)
    res.json(message.error(err.message))
  }
})

router.get('/cards', validateBingo, (req, res) => {
  try {
    res.json(message.sendData(bingo.cards))
  } catch (err: any) {
    res.status(500)
    res.json(message.error(err.message))
  }
})

router.get('/validate/card/:id', validateBingo, (req, res) => {
  try {
    const { id } = req.params
    const cardId = parseInt(id)
    if(isNaN(cardId))
      throw new Error('Invalid card id')

    const data = bingo.validateCard(cardId)
    res.json(message.sendData(data))
  } catch (err: any) {
    res.status(500)
    res.json(message.error(err.message))
  }
})

router.get('/validate/cards', validateBingo, (req, res) => {
  try {
    const data = bingo.validateCards()
    res.json(message.sendData(data))
  } catch (err: any) {
    res.status(500)
    res.json(message.error(err.message))
  }
})

export default router
