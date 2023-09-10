let searBydate = document.getElementById('searchForm')
let fetchReportBtn = document.getElementById('fetchReport')
let submitAtendenceBtn = document.getElementById('submitAttendenceBtn')


searBydate.addEventListener('submit',searchAttendence)
fetchReportBtn.addEventListener('click',showReprt)
submitAtendenceBtn.addEventListener('click',submitAtendence)

async function searchAttendence(e) {
    e.preventDefault()
  
    const date = document.getElementById('inlineFormInputGroupUsername').value
    // console.log(date);
    await axios.get(`http://localhost:5000/teacher/attendenceBydate/${date}`)
    .then((res)=>{
        // console.log(res.data.data);
        if(res.data.data.length > 0){
            showStudentByDates(res.data.data)
        }else{
           showStudents(date)
           document.getElementById('attendenceReport').style.display='none'
        }
    }).catch(err=> console.log(err))
}


function showStudentByDates(students) {
    document.getElementById('showStudentByDate').style.display='block'
    const parent = document.getElementById('studentListByDate')
    students.forEach(stud => {
        let li = document.createElement('li')
        li.className = 'list-group-item'

        let span = document.createElement('span')

        span.innerText = stud.name

        let status = document.createElement('span')
        status.className = 'float-end'

        if(stud.status=='absent'){
            status.innerHTML = '&#10006;'
        }else{
            status.innerHTML = '&#10004;'
        }

        li.appendChild(span)
        li.appendChild(status)

        parent.appendChild(li)
    });
    
}


async function showStudents(){
   
    document.getElementById('markAttendence').style.display='block'
    let parent = document.getElementById('studentList')

    let students = []

    await axios.get('http://localhost:5000/teacher//allstudents')
    .then((res)=>{
        students = res.data.data
    }).catch(err => console.log(err))

    students.forEach((stud)=>{
        let li = document.createElement('li')
        li.className = 'list-group-item student'

        let idSpan = document.createElement('span')
        idSpan.textContent = stud.id;
        idSpan.style.display = 'none'
        
        let nameSapn = document.createElement('span')
        nameSapn.textContent = stud.name

        let div = document.createElement('form')
        div.className = 'float-end'

        let preRadio = document.createElement('input')
        preRadio.type = 'radio'
        preRadio.name = 'status'
        preRadio.id = `${stud.id}+Pre`
        preRadio.value = 'present'

        let abRadio = document.createElement('input')
        abRadio.type = 'radio'
        abRadio.name = 'status'
        abRadio.value = 'absent'
        abRadio.id  = `${stud.id}+Ab`

        let pspan = document.createElement('label')

        pspan.setAttribute('for',`${stud.id}+Pre`)
        pspan.textContent = "Present"
        pspan.className = 'm-2'
        pspan.appendChild(preRadio)

        div.appendChild(pspan)

        let aspan = document.createElement('label')

        aspan.setAttribute('for',`${stud.id}+Ab`) 
        aspan.textContent = "Absent"
        aspan.className = 'm-2'
        aspan.appendChild(abRadio)

        div.appendChild(aspan)

        li.appendChild(idSpan)
        li.appendChild(nameSapn)
        li.appendChild(div)

        parent.appendChild(li)
    })
}   

async function showReprt(){
    document.getElementById('showStudentByDate').style.display='none'
    document.getElementById('attendenceReport').style.display='block'
    let parent = document.getElementById('studentListForReport')

    let students = []

    await axios.get('http://localhost:5000/teacher/allstudents')
    .then((res)=>{
        students = res.data.data
    }).catch(err => console.log(err))

    console.log(students);

    students.forEach((stud)=>{
        let li = document.createElement('li')
        li.className = 'list-group-item '

        let h5 = document.createElement('span')
        h5.textContent = stud.name

        let div = document.createElement('div')
        div.className = 'float-end'

        let aspan = document.createElement('span')
        aspan.className ='m-2'
        aspan.textContent = `${stud.t_attended}/${stud.t_taken}`

        let perSpan = document.createElement('span')
        perSpan.className = 'm-2'

        perSpan.textContent = parseInt(eval((stud.t_attended/stud.t_taken)*100))+'%'

        div.appendChild(aspan)
        div.appendChild(perSpan)

        li.appendChild(h5)
        li.appendChild(div)

        parent.appendChild(li)
    })
}


async function submitAtendence(){
    const date = document.getElementById('inlineFormInputGroupUsername').value
    let studentList = document.querySelectorAll('.student')
    let nwewList = []
    // console.log(studentList);
    studentList.forEach((stud)=>{
        let id=stud.firstChild.textContent;
        let status = ''
        let formsELements = (stud.lastChild.elements)
      
       for (let i  in formsELements){

            if(i==='status'){

             status= formsELements[i].value; 
            }
                
       }

       nwewList.push({id:id,status:status,date:date})
    })

    console.log(nwewList);
    await axios.post('http://localhost:5000/teacher/addAttendence',{
        data:nwewList
    }).then((res)=>{
        alert(res.data.masg+' for date '+date);
    }).catch(err => console.log(err))

    location.reload()
}


