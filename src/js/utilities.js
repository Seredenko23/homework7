let alert

function request (method, url) {
  let BASE_URL = 'https://jsonplaceholder.typicode.com'
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, BASE_URL + url)
    xhr.onload = resolve
    xhr.onerror = reject
    xhr.send()
  })
}

function deleteChildren (elem) {
  while (elem.firstChild) {
    elem.firstChild.remove()
  }
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

export default { createAlert, deleteChildren, request, }
