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

async function getUsers (elem) {
  let response = await request('GET', 'https://jsonplaceholder.typicode.com/users')
 	response = JSON.parse(response.target.responseText)
 	try {
    utility.deleteChildren(elem)
    response.forEach((el) => {
      const listEl = document.createElement('a')
      listEl.textContent = el.name
      listEl.setAttribute('href', '#')
      listEl.dataset.id = el.id
      listEl.classList.add('list-group-item', 'list-group-item-action')
      elem.append(listEl)
    })
    utility.createAlert('Here is yours request!', 'success')
 	} catch (err) {
 		utility.createAlert(err, 'error')
 	}
}

async function getUserPosts (userId, elem) {
  let response = await request('GET', `https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  response = JSON.parse(response.target.responseText)
  try {
  	utility.deleteChildren(elem)
  	const promiseArr = []
  	response.forEach(async (el, ind) => {
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

    	let value = await commentsRequest(el.id)
    	value = JSON.parse(value.target.responseText)
    	const badge = document.createElement('span')
   		badge.classList.add('badge', 'badge-primary')
    	badge.textContent = value.length
    	spiner.remove()
    	postsList.children[ind].append(badge)
    })
  } catch (err) {
  	utility.createAlert(err, 'error')
  }
}

async function getComments (postId, elem) {
  let response = await request('GET', `https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  response = JSON.parse(response.target.responseText)
  try {
    utility.deleteChildren(elem)
    response.forEach((el) => {
      const listEl = document.createElement('span')
      listEl.textContent = el.name
      listEl.dataset.id = el.id
      listEl.classList.add('list-group-item')
      elem.append(listEl)
    })
    utility.createAlert('Here is yours request!', 'success')
 	} catch (err) {
 		utility.createAlert(err, 'error')
 	}
}

function commentsRequest (postId) {
  return request('GET', `https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
}

export { getUsers, getUserPosts, getComments }
