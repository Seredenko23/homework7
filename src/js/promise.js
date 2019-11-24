const utility = require('./utilities')

function request (method, url) {
  return new Promise((resolve, reject) => {
	  const xhr = new XMLHttpRequest()
	  xhr.open(method, url)
	  xhr.onload = resolve
	  xhr.onerror = reject
	  xhr.send()
  })
}

function getUsers (elem) {
  request('GET', 'https://jsonplaceholder.typicode.com/users')
    .then(res => {
    	utility.deleteChildren(elem)
      const users = JSON.parse(res.target.responseText)
      users.forEach((el) => {
      	const listEl = document.createElement('a')
      	listEl.textContent = el.name
      	listEl.setAttribute('href', '#')
      	listEl.dataset.id = el.id
      	listEl.classList.add('list-group-item', 'list-group-item-action')
      	elem.append(listEl)
      })
      utility.createAlert('Here is yours request!', 'success')
    }).catch(err => {
      utility.createAlert(err, 'error')
    })
}

function getUserPosts (userId, elem) {
  request('GET', `https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(res => {
    	utility.deleteChildren(elem)
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
      	 'justify-content-between',
      	 'align-items-center')

      	const spiner = document.createElement('div')
      	spiner.classList.add('spinner-border')
      	listEl.append(spiner)

      	elem.append(listEl)

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
    		utility.createAlert('Here is yours request!', 'success')
    	})
    	.catch(err => {
     	 utility.createAlert(err, 'error')
    	})
    })
    .catch(err => {
      utility.createAlert(err, 'error')
    })
}

function getComments (postId, elem) {
  request('GET', `https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(res => {
    	utility.deleteChildren(elem)
      const comments = JSON.parse(res.target.responseText)
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
      	elem.append(listEl)
      })
      utility.createAlert('Here is yours request!', 'success')
    }).catch(err => {
      utility.createAlert(err, 'error')
    })
}

function commentsRequest (postId) {
  return request('GET', `https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
}

export { getUsers, getUserPosts, getComments }
