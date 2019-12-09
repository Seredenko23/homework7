import utility from './utilities'

function request (method, url) {
	let BASE_URL = 'https://jsonplaceholder.typicode.com'
	let response;
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open(method, BASE_URL + url)
		xhr.onload = (e) => resolve(JSON.parse(e.target.responseText))
		xhr.onerror = reject
		xhr.send()
	})
}

async function getUsers (elem) {
 	try {
 	let response = await request('GET', '/users')
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
  try {
	let response = await request('GET', `/posts?userId=${userId}`)
  	utility.deleteChildren(elem)
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
  try {
	let response = await request('GET', `/comments?postId=${postId}`)
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
  return request('GET', `/comments?postId=${postId}`)
}

export { getUsers, getUserPosts, getComments }
