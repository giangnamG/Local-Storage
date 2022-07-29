

function save(){
    let fullName = document.getElementById('fullName').value
    let email    = document.getElementById('email').value
    let phone    = document.getElementById('phone').value
    let address  = document.getElementById('address').value
    let gender   = ''
    if(document.getElementById('male').checked)
        gender = 'Nam'
    else if(document.getElementById('famale').checked)
        gender = 'Nữ'

    // document.getElementById('fullName').value  = ''
    // document.getElementById('email').value     = ''
    // document.getElementById('phone').value     = ''
    // document.getElementById('address').value   = ''
    // document.getElementById('male').checked    = ''
    // document.getElementById('famale').checked  = ''

    if( fullName && email && phone && address && gender){
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
    
        students.push({
            fullName : fullName,
            email    : email,
            phone    : phone,
            address  : address,
            gender   : gender
        })
        console.log(students)
        localStorage.setItem('students',JSON.stringify(students))
        alert('Lưu Thành Công !!!')
    }
    
    renderListStudent()
}

function renderListStudent(){
  
    document.getElementById('editStudent').style.display = 'none'
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

    console.log('students current: ',students)
    let tableContent = `<header>
                            <td>#</td>
                            <td>Họ và tên</td>
                            <td>Email</td>
                            <td>Số điện thoại</td>
                            <td>Địa chỉ</td>
                            <td>Giới tính</td>
                            <td>Hành động</td>
                        </header>`
    students.forEach((student,index) => {
        index++
        tableContent += `<tr>
                            <td>${index}</td>
                            <td>${student.fullName}</td>
                            <td>${student.email}</td>
                            <td>${student.phone}</td>
                            <td>${student.address}</td>
                            <td>${student.gender}</td>
                            <td>
                                <a href="#" onclick="getFormEdit(${index-1})">Edit</a> | <a href="#" onclick="deleteStudent(${index-1})">Delete</a>
                            </td>
                        </tr>`
            });
    document.getElementById('table-content').innerHTML=tableContent 
   
}
function deleteStudent(id){
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
    students.splice(id,1)
    console.log(students)
    localStorage.setItem('students',JSON.stringify(students))
    renderListStudent()
    alert('Xóa thành công !!!')
} 
var id = 0
function getFormEdit(index){
    id = index
    document.getElementById('editStudent').style.display='block'
    document.getElementById('editStt').innerHTML='Đang sửa thông tin sinh viên thứ '+(index+1)

    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

    students.forEach((student,index) => {
        if(index == id){
            document.getElementById('editFullName').value     = student.fullName
            document.getElementById('editEmail').value        = student.email
            document.getElementById('editPhone').value        = student.phone
            document.getElementById('editAddress').value      = student.address
            if(students[id].gender=='Nam')
                document.getElementById('editMale').checked   = 1
            else 
                document.getElementById('editFamale').checked = 2
                // console.log(students[id])
            return ;
            }
        index++
    })
}
function saveEditStudent(){
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
    
    let student = {}
    student.fullName = document.getElementById('editFullName').value
    student.email    = document.getElementById('editEmail').value
    student.phone    = document.getElementById('editPhone').value
    student.address  = document.getElementById('editAddress').value    
    if(document.getElementById('editMale').checked)
        student.gender = 'Nam'
    else if(document.getElementById('editFamale').checked)
        student.gender = 'Nữ'
    console.log('id: ',id)
    console.log('before edit: ',students[id])
    students[id] = student
    console.log('after edit: ',students[id])

    localStorage.setItem('students',JSON.stringify(students))

    document.getElementById('editStudent').style.display = 'none'
    document.getElementById('editFullName').value  = ''
    document.getElementById('editEmail').value     = ''
    document.getElementById('editPhone').value     = ''
    document.getElementById('editAddress').value   = ''
    document.getElementById('editMale').checked    = ''
    document.getElementById('editFamale').checked  = ''
    renderListStudent()
    alert('Chỉnh sửa thành công !!!')
}
