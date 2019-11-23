import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const userBtn = document.getElementById('users')
const usersList = document.getElementById('usersList')
const postsList = document.getElementById('postsList')

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
usersList.addEventListener('click', (e) => {
  const target = e.target
  if (target.dataset.id) {
    getUserPosts(target.dataset.id)
  }
})

function getUsers () {
  request('GET', 'https://jsonplaceholder.typicode.com/users')
    .then(res => {
      users = JSON.parse(res.target.responseText)
      users.forEach((el) => {
      	const listEl = document.createElement('a')
      	listEl.textContent = el.name
      	listEl.setAttribute('href', '#')
      	listEl.dataset.id = el.id
      	listEl.classList.add('list-group-item', 'list-group-item-action')
      	usersList.append(listEl)
      })
    }).catch(err => {
      console.log(err)
    })
}

function getUserPosts (userId) {
  request('GET', `https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(res => {
      const posts = JSON.parse(res.target.responseText)
      posts.forEach((el) => {
      	const listEl = document.createElement('a')
      	listEl.textContent = el.title
      	listEl.dataset.id = el.id
      	listEl.setAttribute('href', '#')
      	listEl.classList.add('list-group-item', 'list-group-item-action')
      	postsList.append(listEl)
      })
    }).catch(err => {
      console.log(err)
    })
}
