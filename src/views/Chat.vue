<template>
  <div class="container">
      <div class="col-lg-12 offset-lg-12">
          <div class="card bg-info" >
              <div class="card-header text-white">
                  <h4><md-icon>tag</md-icon>{{ $route.params.chatname }} <span class="float-right">{{connections}} connections</span></h4>
              </div>
              <ul class="list-group list-group-flush text-right" ref="scrollLog">
                  <h4 v-if="!messages.length" class="empty">Get the conversation started!</h4>
                  <li class="list-group-item" v-for="message in messages" :key="message.id">
                      <span class="float-left" v-bind:style="{ color: $route.params.chatname.split(',').length > 1 ? stringToColour(message.hashId) : 'black' }">
                          <small v-if="$route.params.chatname.split(',').length > 1" class="empty">#{{message.hashId}}-</small>
                          <small>{{message.username}}:</small>
                          {{message.text}}
                          
                      </span>
                  </li>
              </ul>

              <div class="card-body">
                  <form @submit.prevent>
                      <div class="form-group">
                          <md-field v-if="$route.params.chatname.split(',').length > 1">
                            <label for="movie">Hashtag Select</label>
                            <md-select v-model="selectedHashtagChannel" name="hashtagSelect" id="hashtagSelect" md-dense >
                              <md-option v-for="h in  $route.params.chatname.split(',')" v-bind:key="h" :value="h">#{{h}}</md-option>
                            </md-select>
                          </md-field>
                          <input type="text" class="form-control" v-model="newMessage" 
                              placeholder="Enter message here"  v-on:keyup.enter="sendMessage">
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

  export default {
    name: 'Chat',
    props: {
      msg: String
    },
    data () {
        return {
          messages: [],
          info: [
            {username:"jd", id: 123415, type: "admin" },
            {username:"yoyo", id: 1232415, type: "free" },
            ],
          connections: 0,
          connection: null,
          newMessage:  "",
          selectedHashtagChannel: '', 
          activeColor: 'green'
      }
    },
    methods: {
      handleMessage(msg){
        this.messages.push(msg) 
      },
      sendMessage: function() {
        const today = new Date();
        try {
        this.connection.send(JSON.stringify({ ChatMessage: {username: this.$route.params.name, text: this.newMessage, time: today.toISOString(), hashId: this.selectedHashtagChannel} }));
                  this.$refs.scrollLog.scrollTop = 100000

        } catch (error) {
          console.log(error)
        }
        this.newMessage = ''
      },
      connect () {
        console.log("Starting connection to WebSocket Server")
        this.connection = new WebSocket("ws://hashchat-api.onboarding.dev/app/v1/websocket")
        this.connection.onopen = () => {
          if(this.$route.params.chatname.split(',').length === 1){
            this.selectedHashtagChannel = this.$route.params.chatname
          }
          this.connection.send(JSON.stringify({ MoveChannel: {username: this.$route.params.name, hashId: this.$route.params.chatname} }));
          this.status = 'connected'
          console.log('WebSocket connected to:', this.connection.url)
        }

        this.connection.onmessage = (event) => {
          const msg = JSON.parse(event.data)
          const id = Math.floor(Math.random() * 1000)
          this.connections = msg.activeConnections
          this.messages.push({...JSON.parse(event.data), id:id, type: 1})
        }
      },
      disconnect () {
        this.connection.close()
        this.status = 'disconnected'
        console.log('WebSocket disconnected')
      },
      stringToColour (str) {
        console.log(str)
        var hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (let i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
                console.log(str)

        return colour;
      }
    },

    created: function() {
       this.connect()
    },
    watch: {
    '$route.params.chatname': function (id) {
        this.connection.send(JSON.stringify({ MoveChannel: {username: this.$route.params.name, hashId: id} }));
        this.messages = []
          if(id.split(',').length === 1){
            this.selectedHashtagChannel = id
          }
      }
    },
    updated() {
    this.$nextTick(function () {
      this.$refs.scrollLog.scrollTop = 100000
    })
}

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
.col-lg-12.offset-lg-12{
  padding: 0px;
}
.container {
  padding: 0px;
  width: calc(100vh - 80px);
}
.list-group.list-group-flush.text-right{    
  height: 68vh;
  overflow: auto;
}
.form-group {
  display: flex;
  align-items: baseline;
}
.md-field {
  max-width: 130px;
}
</style>
