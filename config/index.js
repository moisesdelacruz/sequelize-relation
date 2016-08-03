const NAME_DB = 'example'
const PASS = process.env.PASS_DB
const USER = process.env.USER_DB

const database = {
  'url': `postgres://${USER}:${PASS}@localhost:5432/${NAME_DB}`
}

module.exports = database
