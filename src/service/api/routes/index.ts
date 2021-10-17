import { Router } from 'express'
import Bingo  from './bingo'

const router = Router()

router.use('/bingo', Bingo)

export default router
