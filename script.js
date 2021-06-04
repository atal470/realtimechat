const socket=io('http://localhost:3000')
const messageContainer=document.getElementById('message-container')
const messageForm=document.getElementById('send-container')
const messageInput=document.getElementById('message-input')
const nam = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', nam)
socket.on('chat-message',data=>{
    appendMessage(`${data.nam}:${data.message}`)
})
socket.on('user-connected',nam=>{
    appendMessage(`${nam} connected`)
})
socket.on('user-disconnected',nam=>{
    appendMessage(`${nam} disconnected`)
})

// so it does not get refresh after clicking on submit as we will lose date
messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message=messageInput.value
    appendMessage(`You:${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value=''

})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
  }

