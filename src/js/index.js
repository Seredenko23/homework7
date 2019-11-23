import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const userBtn = document.getElementById('users')
const usersList = document.getElementById('usersList')
const postsList = document.getElementById('postsList')
const commentsList = document.getElementById('commentsList')
const mainContent = document.getElementById('mainContent')
let alert

let users
let comments

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

postsList.addEventListener('click', (e) => {
  const target = e.target
  if (target.dataset.id) {
    getComments(target.dataset.id)
  }
})

function getUsers () {
  request('GET', 'https://jsonplaceholder.typicode.com/users')
    .then(res => {
    	deleteChildren(usersList)
      users = JSON.parse(res.target.responseText)
      users.forEach((el) => {
      	const listEl = document.createElement('a')
      	listEl.textContent = el.name
      	listEl.setAttribute('href', '#')
      	listEl.dataset.id = el.id
      	listEl.classList.add('list-group-item', 'list-group-item-action')
      	usersList.append(listEl)
      })
      createAlert('Here is yours request!', 'success')
    }).catch(err => {
      createAlert(err, 'error')
    })
}

function getUserPosts (userId) {
  request('GET', `https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(res => {
    	deleteChildren(postsList)
      const posts = JSON.parse(res.target.responseText)
      const promiseArr = []
      posts.forEach((el) => {
      	const listEl = document.createElement('a')
      	listEl.textContent = el.title
      	listEl.dataset.id = el.id
      	listEl.setAttribute('href', '#')
      	listEl.classList.add('list-group-item',
      	 'list-group-item-action',
      	 'd-flex',
      	 'flex-row',
      	 'justify-content-between')

      	const spiner = document.createElement('div')
      	spiner.classList.add('spinner-border')
      	listEl.append(spiner)

      	postsList.append(listEl)

      	promiseArr.push(commentsRequest(el.id))
      })
      return promiseArr
    })
    .then(prom => {
    	Promise.all(prom)
    	.then(values => {
    		values.forEach((el, ind) => {
    			const value = JSON.parse(el.target.responseText)
    			const badge = document.createElement('span')
    			badge.classList.add('badge', 'badge-primary')
    			badge.textContent = value.length
    			postsList.children[ind]
    			.getElementsByClassName('spinner-border')[0].remove()
    			postsList.children[ind].append(badge)
    		})
    		createAlert('Here is yours request!', 'success')
    	})
    	.catch(err => {
     	 createAlert(err, 'error')
    	})
    })
    .catch(err => {
      createAlert(err, 'error')
    })
}

function getComments (postId) {
  request('GET', `https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(res => {
    	deleteChildren(commentsList)
      comments = JSON.parse(res.target.responseText)
      comments.forEach((el) => {
      	const listEl = document.createElement('li')
      	const name = document.createElement('span')

      	name.textContent = el.name
      	name.classList.add('font-weight-bold')
      	listEl.append(name)

      	const content = document.createElement('span')
      	content.textContent = el.body
      	listEl.append(content)

      	listEl.classList.add('list-group-item',
      	 'd-flex',
      	 'flex-column',
      	 'justify-center')
      	commentsList.append(listEl)
      })
      createAlert('Here is yours request!', 'success')
    }).catch(err => {
      createAlert(err, 'error')
    })
}

function commentsRequest (postId) {
  return request('GET', `https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
}

function createAlert (text, type) {
  if (alert) alert.remove()
  alert = document.createElement('div')
  alert.classList.add('alert')
  alert.textContent = text
  switch (type) {
    case 'error':
      alert.classList.add('alert-danger')
      break
    case 'success':
      alert.classList.add('alert-success')
      break
    default:
      alert.classList.add('alert alert-primary')
  }
  mainContent.prepend(alert)
}

function deleteChildren (elem) {
  while (elem.firstChild) {
    elem.firstChild.remove()
  }
}
