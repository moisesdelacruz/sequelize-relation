$.ajax('/api/users', {
  success: (users, textStatus, xhr) => {
    var content = document.getElementsByClassName('content')
    console.log(users)
    for (var i = 0; i < users.length; i++) {
      var $item = `
      <div class="item">
        <img src="/static/${users[i].photo}" width="200" height="200" alt="photo" class="img-circle">
        <h2>${users[i].username}</h2>
        <h3>${users[i].email}</h3>
        <h3>${users[i].Role.title}</h3>
      </div>`
      $(content[0]).append($item)
    }
  }
})
