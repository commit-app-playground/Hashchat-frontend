// import { createApp } from 'vue'


// const socket = new WebSocket("ws://127.0.0.1:8080/app/v1/websocket")

// const emitter = createApp({
//   methods:{
//     send(message){
//       if (1 === socket.readyState)
//         socket.send(message)
//     }
//   }
// })
// socket.onopen = () => {
//   console.log('WebSocket connected !')
// }

// socket.onmessage = function(msg){
//   emitter.$emit("message", msg.data)
// }
// socket.onerror = function(err){
//   emitter.$emit("error", err)
// }

// emitter.mount("#App")