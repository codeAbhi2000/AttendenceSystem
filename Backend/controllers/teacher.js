const Attendence = require('../models/attendence')
const Students = require('../models/student')


exports.getAttendenceBydate = (req,res,next)=>{
    const date = req.params.date
    Attendence.findByDate(date)
    .then((data)=>{
        // console.log(data)
        res.json({
            data : data[0]
        })
    }).catch(err => console.log(err))
}


exports.getAllStudents = (req,res,next)=>{
    Students.getStudent()
    .then((data)=>{
        res.json({
            data:data[0]
        })
    }).catch(err => console.log(err))
}


exports.postMarkAttendence = (req,res,next)=>{
    const data = req.body.data
    const attendence = new Attendence(data)

    attendence.save()
    .then((response)=>{
       res.json({
        msg:"Attendence Marked"
       })
    }).catch(err => console.log(err))
}