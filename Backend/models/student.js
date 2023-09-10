const db = require('../db')

module.exports = class Student{
    static getStudent(){
        return db.execute('SELECT * FROM student')
    }
}