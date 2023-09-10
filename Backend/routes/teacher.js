const express = require('express')

const teacherController = require('../controllers/teacher')

const router = express.Router()


router.get('/attendenceBydate/:date',teacherController.getAttendenceBydate)

router.get('/allstudents',teacherController.getAllStudents)

router.post('/addAttendence',teacherController.postMarkAttendence)


module.exports = router;