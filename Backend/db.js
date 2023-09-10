const mysql = require('mysql2')

const Pool = mysql.createPool({
    host:'localhost',
    password:"password",
    user:'root',
    database:'attendenceSystem'
})


module.exports = Pool.promise()