const express = require('express')
const expressGQL = require('express-graphql')
const schema = require('./schema')

const app = express()

const PORT = process.env.PORT || 4000

app.use('/graphql', expressGQL({
  schema,
  graphiql: true
}))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))