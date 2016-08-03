var socket = io()

var form = document.getElementById('upload-form')
var formRole = document.getElementById('upload-role')
var image = document.getElementsByName('image')[0]
form.addEventListener('submit', formData)
formRole.addEventListener('submit', formDataRole)
image.addEventListener('change', changeImage)

function formData (e) {
  e.preventDefault()
  var formData = new FormData(form)
  $.ajax({
    url: "/upload",
    type: "post",
    dataType: "html",
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      console.log(data)
    }
  })
}

function formDataRole (e) {
  e.preventDefault()
  var nameRole = document.getElementsByName('nameRole')
  var data = {
    title: nameRole[0].value
  }
  socket.emit('newrole', data)
}

socket.on('message', (message) => {
  console.log(message)
})

function changeImage (e) {
  var photo = document.getElementById('photo')
  var file = e.target.files[0]
  photo.src = window.URL.createObjectURL(file)
}

$.ajax('/api/roles', {
  success: (roles, textStatus, xhr) => {
    var role = document.getElementsByName('role')
    for (var i = 0; i < roles.length; i++) {
      var option = document.createElement("option")
      option.value = roles[i].id
      option.text = roles[i].title
      role[0].add(option)
    }
  }
})
