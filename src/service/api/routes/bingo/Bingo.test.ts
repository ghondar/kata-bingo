import request from 'supertest'
import Message from '../../utils/Message'

import app from '../../app'
import { Card } from '../../controllers/Bingo'

const message = new Message()

describe('Bingo', () => {
  const agent = request.agent(app)
  it('start game', async () => {
    const response = await agent.get('/api/v1/bingo/start')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(message.success('Bingo started'))
  })

  it('create card', async () => {
    const response = await agent.get('/api/v1/bingo/create/bingo-card')
    expect(response.status).toBe(200)
    expect(response.body.Success).toBe(true)
    expect(response.body.data.card._id).toBe(1)
    expect(response.body.data.card.fields.length).toBe(5)
  })

  it('generate number', async () => {
    const response = await agent.get('/api/v1/bingo/generate-number')

    expect(response.status).toBe(200)
    expect(response.body.Success).toBe(true)
    expect(typeof response.body.data.number).toBe('number')
  })

  it('show cards', async () => {
    const response = await agent.get('/api/v1/bingo/cards')

    expect(response.status).toBe(200)
    expect(response.body.Success).toBe(true)
    expect(Array.isArray(response.body.data.cards)).toBe(true)
    response.body.data.cards.forEach((card: Card) => {
      expect(card._id).toBe(1)
      expect(card.fields.length).toBe(5)
    })
  })
})
