import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const userBtn = document.getElementById('users')
const list = document.getElementById('usersList')

let users

function request (method, url) {
  return new Promise((resolve, reject) => {
	  var xhr = new XMLHttpRequest()
	  xhr.open(method, url)
	  xhr.onload = resolve
	  xhr.onerror = reject
	  xhr.send()
  })
}

userBtn.addEventListener('click', getUsers)

function getUsers (e) {
  request('GET', 'https://jsonplaceholder.typicode.com/users')
    .then(res => {
      users = JSON.parse(res.target.responseText)
      for (var i = 0; i < users.length; i++) {
      	const listEl = document.createElement('a')
      	listEl.textContent = users[i].name
      	listEl.setAttribute('href', '#')
      	listEl.classList.add('list-group-item', 'list-group-item-action')
      	list.append(listEl)
      }
      console.log(users)
    }).catch(err => {
      console.log(err)
    })
}
