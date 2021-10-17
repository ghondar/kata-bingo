import signale from 'signale'
import http from 'http'

import app from './service/api/app'

// import './config/connections'

const { PORT } = process.env

const server = http.createServer(app)

server.listen(PORT, () => {
  signale.success(`Server ready at http://localhost:${PORT}/`)
})

