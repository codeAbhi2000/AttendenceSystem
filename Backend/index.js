const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const teacherRouters = require('./routes/teacher')
const app = express()

app.use(cors())

app.use(bodyParser.json({extended:false}))

app.use('/teacher',teacherRouters)



app.listen(5000)
