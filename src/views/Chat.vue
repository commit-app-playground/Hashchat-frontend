<template>
  <div class="container">
      <div class="col-lg-6 offset-lg-3">
          <div class="card bg-info" >
              <div class="card-header text-white">
                  <h4>{{ $route.params.chatname }} <span class="float-right">{{connections}} connections</span></h4>
              </div>
              <ul class="list-group list-group-flush text-right">
                  <li class="list-group-item" v-for="message in messages" :key="message.id">
                      <span class="float-left">
                          <small>{{message.user}}</small>
                          {{message.text}}
                          
                      </span>
                  </li>
              </ul>

              <div class="card-body">
                  <form @submit.prevent="send">
                      <div class="form-group">
                          <input type="text" class="form-control" v-model="newMessage" 
                              placeholder="Enter message here"  v-on:keyup.enter="sendMessage('hello')">
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  // import Socket from "../js/socket"

  export default {
    name: 'Chat',
    props: {
      msg: String
    },
    data () {
        return {
          messages: [
            {text: "Hey man how are you keeping", user:"jd", id: 12345, type: 1 },
            {text: "Pretty good yourself?", user:"yoyo", id: 123456, type: 1 },
                {text: "What do you think of this new chat app?", user:"jd", id: 123451213, type: 0 },
            {text: "Yeah it's pretty cool, still getting used to it though", user:"yoyo", id: 123412312356, type: 1 },
          
          ],
          info: [
            {username:"jd", id: 123415, type: "admin" },
            {username:"yoyo", id: 1232415, type: "free" },
            ],
          connections: 2,
          connection: null,
          newMessage:  "danman",
            
      }
    },
    methods: {
      handleMessage(msg){
        this.messages.push(msg) 
      },
      sendMessage: function(msg) {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;
        console.log(msg)
        try {
        this.connection.send(JSON.stringify({username: "danman", text: "ain't this some shit", time: dateTime, hashId: '#general'}));
        } catch (error) {
          console.log(error)
        }
        this.newMessage = ''
      },
      connect () {
        console.log("Starting connection to WebSocket Server")
        this.connection = new WebSocket("ws://127.0.0.1:8080/app/v1/websocket")
        this.connection.onopen = () => {
          this.status = 'connected'
          console.log('WebSocket connected to:', this.connection.url)
        }

        this.connection.onmessage = (event) => {
          console.log(JSON.parse(event.data));
          console.log(this.$data.messages);
          this.messages.push({...JSON.parse(event.data), id: 12345, type: 1})
        }
      },
      disconnect () {
        this.connection.close()
        this.status = 'disconnected'
        console.log('WebSocket disconnected')
      },
    },

    created: function() {
       this.connect()
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
