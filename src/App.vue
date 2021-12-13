<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title"  v-on:click="goHome">Hashchat</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full"  v-if="username !== ''">
        <md-toolbar class="md-transparent" md-elevation="0">
          <img alt="Vue logo" src="./assets/hashtag.png" class="test" v-on:click="goHome">
        </md-toolbar>

        <h4 v-if="!channels.length" class="empty">Add a tag!</h4>
        <md-list v-for="channel in channels" :key="channel"  v-on:click="goToChat(channel)">
          <md-list-item v-for="c in channel.split(',')" :key="c">
            <md-icon>tag</md-icon>
            <span class="md-list-item-text">{{c}}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view v-on:childToParent="setName" v-on:onUpdateHashags="updateHashtags"/>
      </md-app-content>
    </md-app>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'App',
  data () {
    return {
      channels: [],
      username:  '',
    }
  },
  methods: {
    setName (value) {
      this.username = value
      axios.get(`https://hashchat-api.onboarding.dev/app/v1/user/${this.username}`).then(response => (this.channels = response.data))
    },
    goToChat(hashtagId) {
      this.$router.push({ path: `/user/${this.username}/chat/${hashtagId}` })
    },
    goHome() {
      if(this.username !== ''){
        this.$router.push({ path: `/user/${this.username}` })
      } else {
        this.$router.push({ path: `/` })
      }
    },
    updateHashtags (value) {
      this.channels.push(value)
    },
         
  },
  mounted () {
    if(this.$route.params.name !== '' && this.$route.params.name !== undefined){
      this.username = this.$route.params.name
      axios.get(`https://hashchat-api.onboarding.dev/app/v1/user/${this.username}`).then(response => (this.channels = response.data))
      if(this.$route.params.chatname !== '' && this.$route.params.chatname !== undefined){
        this.$router.push({ path: `/user/${this.username}/chat/${this.$route.params.chatname}` })
      } else {
        this.$router.push({ path: `/user/${this.username}` })
      }
    }
  }
}

</script>


<style scoped>
  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 350px;
  }
  .md-list {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
    flex-direction: inherit;
  }
  .md-list:hover {
    background-color: rgba(0,0,0,0.12);
    color: rgba(0,0,0,0.87);
  }
  .test {
    height: 50px;
    width: 50px;
    margin: auto;
  }
  .empty {
     border-top: 0.5px solid lightgrey;
     padding-top: 20px;
     text-align: center;
  }
  .md-toolbar {
    padding: 20px
  }
  .md-icon.md-theme-default.md-icon-font {
    margin-right: -2px
  }
  .md-app .md-content.md-theme-default{
    padding: 0px;
    margin: 0px;
    min-width: calc(50% - 80px);
    max-width: calc(90% - 80px);
  }
</style>