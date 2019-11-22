import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function request (method, url) {
  return new Promise((resolve, reject) => {
	  var xhr = new XMLHttpRequest()
	  xhr.open(method, url)
	  xhr.onload = resolve
	  xhr.onerror = reject
	  xhr.send()
  })
}
