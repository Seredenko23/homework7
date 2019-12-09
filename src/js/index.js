import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './../css/style.css'
const prom = require('./promise')
//const asyn = require('./async_await')

const userBtn = document.getElementById('users')
const usersList = document.getElementById('usersList')
const postsList = document.getElementById('postsList')
const commentsList = document.getElementById('commentsList')
const mainContent = document.getElementById('mainContent')

// // this code for async/await
// userBtn.addEventListener('click', () => asyn.getUsers(usersList))
//
// usersList.addEventListener('click', (e) => {
//   const target = e.target
//   if (target.dataset.id) {
//     asyn.getUserPosts(target.dataset.id, postsList)
//   }
// })
//
// postsList.addEventListener('click', (e) => {
//   const target = e.target
//   if (target.dataset.id) {
//     asyn.getComments(target.dataset.id, commentsList)
//   }
// })

// This code for promise
userBtn.addEventListener('click', () => prom.getUsers(usersList))

usersList.addEventListener('click', (e) => {
  const target = e.target
  if (target.dataset.id) {
    prom.getUserPosts(target.dataset.id, postsList)
  }
})

postsList.addEventListener('click', (e) => {
  const target = e.target
  if (target.dataset.id) {
    prom.getComments(target.dataset.id, commentsList)
  }
})
