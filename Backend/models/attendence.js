const db = require('../db')

module.exports = class Attendence{
    constructor(data){
        this.data = data
    }

    save(){

        let values = this.data.map(item =>[item.date,item.id,item.status])
                  
        return db.query('insert into attendence (date,sid,status) values ?',
        [values])
    }

    static findByDate(date){
        return db.execute('select student.name,status from student ,attendence where id = sid and date = ?',[date])
    }
}